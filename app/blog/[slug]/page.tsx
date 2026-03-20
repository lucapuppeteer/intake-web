import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getAllSlugs, getPostBySlug, getAllPosts } from "@/lib/blog";
import { createMetadata } from "@/lib/metadata";
import { Badge } from "@/components/ui/badge";
import { BlogCard } from "@/components/blog/blog-card";
import { JsonLd } from "@/components/shared/json-ld";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { frontmatter } = getPostBySlug(slug);
    return createMetadata({
      title: frontmatter.title,
      description: frontmatter.description,
      path: `/blog/${slug}`,
      type: "article",
    });
  } catch {
    return createMetadata({ title: "Post Not Found" });
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const { frontmatter, content, readingTime } = post;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${slug}`,
    },
    author: {
      "@type": "Person",
      name: frontmatter.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    url: `${SITE_URL}/blog/${slug}`,
    keywords: frontmatter.tags.join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: frontmatter.title,
        item: `${SITE_URL}/blog/${slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <article className="py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="mb-10">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: frontmatter.title },
              ]}
            />
            <div className="mb-4 flex flex-wrap gap-2">
              {frontmatter.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="font-serif text-3xl tracking-tight sm:text-4xl">
              {frontmatter.title}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              {frontmatter.description}
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <span>{frontmatter.author}</span>
              <span>&middot;</span>
              <time dateTime={frontmatter.date}>
                {new Date(frontmatter.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <span>&middot;</span>
              <span>{readingTime} min read</span>
            </div>
          </header>

          {frontmatter.coverImage && (
            <div className="relative mb-10 overflow-hidden rounded-xl">
              <Image
                src={frontmatter.coverImage}
                alt={frontmatter.title}
                width={1200}
                height={630}
                className="w-full object-cover aspect-[2/1]"
                priority
              />
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-black/5" />
            </div>
          )}

          {/* Content */}
          <div className="article-content">
            <BlogContent content={content} />
          </div>

          <aside className="mt-16 border-t pt-10">
            <h2 className="font-serif text-2xl mb-6">Related Articles</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {getAllPosts()
                .filter((p) => p.slug !== slug)
                .slice(0, 2)
                .map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
            </div>
            <p className="mt-8 text-muted-foreground">
              Learn more about{" "}
              <Link
                href="/#features"
                className="text-primary underline hover:text-primary/80"
              >
                AI patient intake features
              </Link>{" "}
              or{" "}
              <Link
                href="/#how-it-works"
                className="text-primary underline hover:text-primary/80"
              >
                see how it works
              </Link>
              .
            </p>
          </aside>
        </div>
      </article>
    </>
  );
}

function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  // Match [text](url) links, **bold**, and plain text
  const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|(\|)/g;
  let lastIndex = 0;
  let match;
  let k = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[1] && match[2]) {
      // Link
      parts.push(
        <Link key={k++} href={match[2]} className="text-primary underline hover:text-primary/80">
          {match[1]}
        </Link>
      );
    } else if (match[3]) {
      // Bold
      parts.push(<strong key={k++} className="font-semibold text-foreground">{match[3]}</strong>);
    } else if (match[4]) {
      parts.push(match[4]);
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts;
}

function BlogContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentParagraph: string[] = [];
  let currentUl: string[] = [];
  let currentOl: string[] = [];
  let inTable = false;
  let tableRows: string[][] = [];
  let key = 0;

  function flushParagraph() {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(" ").trim();
      if (text) {
        elements.push(
          <p key={key++} className="mb-4 text-muted-foreground leading-relaxed">
            {renderInline(text)}
          </p>
        );
      }
      currentParagraph = [];
    }
  }

  function flushUl() {
    if (currentUl.length > 0) {
      elements.push(
        <ul key={key++} className="mb-4 ml-6 list-disc space-y-1 text-muted-foreground">
          {currentUl.map((item, i) => (
            <li key={i} className="leading-relaxed">{renderInline(item)}</li>
          ))}
        </ul>
      );
      currentUl = [];
    }
  }

  function flushOl() {
    if (currentOl.length > 0) {
      elements.push(
        <ol key={key++} className="mb-4 ml-6 list-decimal space-y-1 text-muted-foreground">
          {currentOl.map((item, i) => (
            <li key={i} className="leading-relaxed">{renderInline(item)}</li>
          ))}
        </ol>
      );
      currentOl = [];
    }
  }

  function flushTable() {
    if (tableRows.length > 0) {
      const header = tableRows[0];
      const body = tableRows.slice(1);
      elements.push(
        <div key={key++} className="mb-6 overflow-x-auto">
          <table className="w-full text-sm text-muted-foreground border-collapse">
            <thead>
              <tr className="border-b">
                {header.map((cell, i) => (
                  <th key={i} className="py-2 px-3 text-left font-semibold text-foreground">
                    {renderInline(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, i) => (
                <tr key={i} className="border-b border-border/50">
                  {row.map((cell, j) => (
                    <td key={j} className="py-2 px-3">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    }
  }

  function flushAll() {
    flushParagraph();
    flushUl();
    flushOl();
    flushTable();
  }

  for (const line of lines) {
    const trimmed = line.trim();

    // Table rows
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      flushParagraph();
      flushUl();
      flushOl();
      // Skip separator rows like |---|---|---|
      if (/^\|[\s\-:|]+\|$/.test(trimmed)) {
        inTable = true;
        continue;
      }
      inTable = true;
      const cells = trimmed
        .slice(1, -1)
        .split("|")
        .map((c) => c.trim());
      tableRows.push(cells);
    } else if (inTable) {
      flushTable();
      // Process this line normally below
      if (trimmed.startsWith("### ")) {
        elements.push(
          <h3 key={key++} className="mb-3 mt-8 font-serif text-lg">
            {trimmed.slice(4)}
          </h3>
        );
      } else if (trimmed.startsWith("## ")) {
        elements.push(
          <h2 key={key++} className="mb-4 mt-10 font-serif text-2xl tracking-tight">
            {trimmed.slice(3)}
          </h2>
        );
      } else if (trimmed === "") {
        // empty line
      } else {
        currentParagraph.push(trimmed);
      }
    } else if (trimmed.startsWith("### ")) {
      flushAll();
      elements.push(
        <h3 key={key++} className="mb-3 mt-8 font-serif text-lg">
          {trimmed.slice(4)}
        </h3>
      );
    } else if (trimmed.startsWith("## ")) {
      flushAll();
      elements.push(
        <h2 key={key++} className="mb-4 mt-10 font-serif text-2xl tracking-tight">
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith("- ")) {
      flushParagraph();
      flushOl();
      currentUl.push(trimmed.slice(2));
    } else if (/^\d+\.\s/.test(trimmed)) {
      flushParagraph();
      flushUl();
      currentOl.push(trimmed.replace(/^\d+\.\s/, ""));
    } else if (trimmed === "") {
      flushAll();
    } else {
      flushUl();
      flushOl();
      currentParagraph.push(trimmed);
    }
  }
  flushAll();

  return <>{elements}</>;
}
