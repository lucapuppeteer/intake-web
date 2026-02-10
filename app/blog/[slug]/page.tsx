import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { createMetadata } from "@/lib/metadata";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/shared/json-ld";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
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

  const { frontmatter, content } = post;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    author: {
      "@type": "Person",
      name: frontmatter.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    url: `${SITE_URL}/blog/${slug}`,
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <article className="py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="mb-10">
            <div className="mb-4 flex flex-wrap gap-2">
              {frontmatter.tags.map((tag: string) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
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
            </div>
          </header>

          {/* Content */}
          <div className="article-content">
            <BlogContent content={content} />
          </div>
        </div>
      </article>
    </>
  );
}

function BlogContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentParagraph: string[] = [];
  let currentList: string[] = [];
  let key = 0;

  function flushParagraph() {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(" ").trim();
      if (text) {
        elements.push(
          <p key={key++} className="mb-4 text-muted-foreground leading-relaxed">
            {text}
          </p>
        );
      }
      currentParagraph = [];
    }
  }

  function flushList() {
    if (currentList.length > 0) {
      elements.push(
        <ul key={key++} className="mb-4 ml-6 list-disc space-y-1 text-muted-foreground">
          {currentList.map((item, i) => (
            <li key={i} className="leading-relaxed">{item}</li>
          ))}
        </ul>
      );
      currentList = [];
    }
  }

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      elements.push(
        <h3 key={key++} className="mb-3 mt-8 text-lg font-semibold">
          {trimmed.slice(4)}
        </h3>
      );
    } else if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      elements.push(
        <h2 key={key++} className="mb-4 mt-10 text-2xl font-bold tracking-tight">
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith("- ")) {
      flushParagraph();
      currentList.push(trimmed.slice(2));
    } else if (trimmed === "") {
      flushParagraph();
      flushList();
    } else {
      flushList();
      currentParagraph.push(trimmed);
    }
  }
  flushParagraph();
  flushList();

  return <>{elements}</>;
}
