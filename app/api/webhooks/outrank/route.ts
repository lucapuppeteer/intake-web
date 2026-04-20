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
  // Verify webhook secret
  const secret = process.env.OUTRANK_WEBHOOK_SECRET;
  if (secret) {
    const authHeader = req.headers.get("x-outrank-secret") ?? req.headers.get("authorization");
    if (authHeader !== secret && authHeader !== `Bearer ${secret}`) {
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

  // Normalize field names — Outrank may use different keys
  const payload: OutrankPayload = {
    title: (raw.title ?? raw.post_title ?? raw.headline ?? "") as string,
    slug: (raw.slug ?? raw.post_slug ?? raw.url_slug ?? "") as string,
    content: (raw.content ?? raw.body ?? raw.post_content ?? raw.markdown ?? raw.html ?? "") as string,
    description: (raw.description ?? raw.excerpt ?? raw.meta_description ?? raw.summary ?? "") as string,
    author: (raw.author ?? raw.author_name ?? "") as string,
    tags: (raw.tags ?? raw.categories ?? []) as string[],
    cover_image: (raw.cover_image ?? raw.featured_image ?? raw.image ?? raw.thumbnail ?? "") as string,
    published_at: (raw.published_at ?? raw.date ?? raw.created_at ?? "") as string,
  };

  // If this looks like a test ping (no real content), acknowledge it
  if (!payload.title && !payload.slug && !payload.content) {
    console.log("[outrank-webhook] test ping received, raw:", JSON.stringify(raw));
    return NextResponse.json({ ok: true, message: "Webhook received (test ping)" }, { status: 200 });
  }

  if (!payload.title || !payload.content) {
    return NextResponse.json(
      { error: "Missing required fields", received_keys: Object.keys(raw) },
      { status: 400 }
    );
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

  if (!result.ok) {
    console.error("[outrank-webhook]", result.message);
    return NextResponse.json({ error: result.message }, { status: 500 });
  }

  console.log("[outrank-webhook]", result.message);
  return NextResponse.json({ ok: true, slug, message: result.message }, { status: 200 });
}
