import { getAllPosts } from "@/lib/blog";
import { createMetadata } from "@/lib/metadata";
import { BlogCard } from "@/components/blog/blog-card";
import { SectionHeading } from "@/components/shared/section-heading";
import { JsonLd } from "@/components/shared/json-ld";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata = createMetadata({
  title: "AI Patient Intake Blog — Guides, Case Studies & Insights",
  description:
    "Expert guides on AI patient intake, patient intake automation, EHR integration, and HIPAA compliance. Learn how AI is transforming clinical workflows.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${SITE_NAME} Blog`,
    url: `${SITE_URL}/blog`,
    description: "Articles about AI-powered patient intake and healthcare technology.",
  };

  return (
    <>
      <JsonLd data={collectionSchema} />
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Blog"
            subtitle="Insights on AI intake, healthcare technology, and clinical workflow optimization."
          />

          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No posts yet. Check back soon.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
