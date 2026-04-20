import { NextRequest, NextResponse } from "next/server";

// Outrank webhook payload shape (adjust field names if Outrank uses different keys)
interface OutrankPayload {
  title: string;
  slug: string;
  content: string; // markdown/MDX body
  description?: string;
  author?: string;
  tags?: string[];
  cover_image?: string;
  published_at?: string; // ISO date string
}

function buildMdx(payload: OutrankPayload): string {
  const date = payload.published_at
    ? payload.published_at.slice(0, 10)
    : new Date().toISOString().slice(0, 10);

  const tags = payload.tags?.length
    ? `[${payload.tags.map((t) => `"${t}"`).join(", ")}]`
    : `["AI", "patient intake", "healthcare"]`;

  const coverImage = payload.cover_image
    ? `coverImage: "${payload.cover_image}"`
    : `coverImage: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&q=80"`;

  const frontmatter = `---
title: "${payload.title.replace(/"/g, '\\"')}"
description: "${(payload.description ?? "").replace(/"/g, '\\"')}"
date: "${date}"
author: "${payload.author ?? "IntakeAI Team"}"
tags: ${tags}
published: true
${coverImage}
---`;

  return `${frontmatter}\n\n${payload.content}`;
}

async function commitToGitHub(
  slug: string,
  mdxContent: string
): Promise<{ ok: boolean; message: string }> {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO; // e.g. "lucauser/intake-web"
  const branch = process.env.GITHUB_BRANCH ?? "main";

  if (!token || !repo) {
    return { ok: false, message: "Missing GITHUB_TOKEN or GITHUB_REPO env vars" };
  }

  const path = `content/blog/${slug}.mdx`;
  const apiBase = `https://api.github.com/repos/${repo}/contents/${path}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  };

  // Check if file already exists (need SHA to update)
  let sha: string | undefined;
  const existing = await fetch(`${apiBase}?ref=${branch}`, { headers });
  if (existing.ok) {
    const data = await existing.json();
    sha = data.sha;
  }

  const body: Record<string, string> = {
    message: `feat(blog): add "${slug}" via Outrank webhook`,
    content: Buffer.from(mdxContent, "utf-8").toString("base64"),
    branch,
  };
  if (sha) body.sha = sha;

  const res = await fetch(apiBase, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    return { ok: false, message: `GitHub API error ${res.status}: ${err}` };
  }

  return { ok: true, message: `Committed ${path} to ${repo}@${branch}` };
}

export async function POST(req: NextRequest) {
  // Verify webhook secret — check all common header locations
  const secret = process.env.OUTRANK_WEBHOOK_SECRET;
  if (secret) {
    const candidates = [
      req.headers.get("x-outrank-secret"),
      req.headers.get("x-webhook-secret"),
      req.headers.get("x-secret"),
      req.headers.get("x-api-key"),
      req.headers.get("authorization"),
      new URL(req.url).searchParams.get("secret"),
    ];
    const authorized = candidates.some(
      (v) => v === secret || v === `Bearer ${secret}`
    );
    if (!authorized) {
      console.log("[outrank-webhook] auth failed. Headers:", JSON.stringify(Object.fromEntries(req.headers)));
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Log the full payload so we can inspect field names in Vercel logs
  console.log("[outrank-webhook] received payload:", JSON.stringify(raw, null, 2));

  // Handle Outrank's nested publish_articles event: { event_type, data: { articles: [...] } }
  const articles: Record<string, unknown>[] = [];
  if (raw.data && typeof raw.data === "object") {
    const data = raw.data as Record<string, unknown>;
    if (Array.isArray(data.articles) && data.articles.length > 0) {
      articles.push(...(data.articles as Record<string, unknown>[]));
    }
  }

  // If no nested articles, treat root object as a single article (fallback for other senders)
  if (articles.length === 0) {
    if (!raw.title && !raw.slug && !raw.content && !raw.content_markdown) {
      console.log("[outrank-webhook] test ping received, raw:", JSON.stringify(raw));
      return NextResponse.json({ ok: true, message: "Webhook received (test ping)" }, { status: 200 });
    }
    articles.push(raw);
  }

  const results: { slug: string; ok: boolean; message: string }[] = [];

  for (const art of articles) {
    // Normalize field names — handles Outrank and other senders
    const payload: OutrankPayload = {
      title: (art.title ?? art.post_title ?? art.headline ?? "") as string,
      slug: (art.slug ?? art.post_slug ?? art.url_slug ?? "") as string,
      content: (art.content_markdown ?? art.content ?? art.body ?? art.post_content ?? art.markdown ?? art.html ?? "") as string,
      description: (art.meta_description ?? art.description ?? art.excerpt ?? art.summary ?? "") as string,
      author: (art.author ?? art.author_name ?? "") as string,
      tags: (art.tags ?? art.categories ?? []) as string[],
      cover_image: (art.image_url ?? art.cover_image ?? art.featured_image ?? art.image ?? art.thumbnail ?? "") as string,
      published_at: (art.created_at ?? art.published_at ?? art.date ?? "") as string,
    };

    if (!payload.title || !payload.content) {
      console.log("[outrank-webhook] skipping article with missing fields:", { title: payload.title, contentLen: payload.content.length });
      results.push({ slug: "", ok: false, message: "Missing title or content" });
      continue;
    }

    // Auto-generate slug from title if missing
    if (!payload.slug) {
      payload.slug = payload.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
    }

    // Sanitize slug
    const slug = payload.slug
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    const mdx = buildMdx({ ...payload, slug });
    const result = await commitToGitHub(slug, mdx);
    console.log("[outrank-webhook]", result.message);
    results.push({ slug, ...result });
  }

  const failed = results.filter((r) => !r.ok);
  if (failed.length > 0 && results.every((r) => !r.ok)) {
    return NextResponse.json({ error: failed[0].message }, { status: 500 });
  }

  const committed = results.filter((r) => r.ok).map((r) => r.slug);
  return NextResponse.json({ ok: true, committed, results }, { status: 200 });
}
