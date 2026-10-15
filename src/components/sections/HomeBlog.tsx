import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { SectionHeading } from "@/components/ui/section";
import type { PostData } from "@/lib/posts";

function formatPostDate(date: string): string {
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function HomeBlog({ posts }: { posts: PostData[] }) {
  if (posts.length === 0) return null;

  return (
    <section
      id="blog"
      className="py-24 bg-bg relative"
      aria-labelledby="home-blog-heading"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            index="04"
            eyebrow="Blog"
            align="left"
            titleId="home-blog-heading"
            title={
              <>
                Derniers <span className="text-accent">articles.</span>
              </>
            }
            description="Conseils web, hardware et Linux depuis le Médoc, pour avancer concrètement sur vos projets."
          />
          <Link
            href="/blog/"
            className="group inline-flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-wider text-accent transition-colors hover:text-text-strong focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            Voir tous les articles
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}/`}
              className="group flex flex-col h-full bg-surface-card border border-default rounded-xl overflow-hidden hover:border-strong transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-48 w-full bg-surface-sunken relative overflow-hidden">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.imageAlt || post.title}
                    width={640}
                    height={360}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="h-full w-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  />
                ) : null}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 text-xs font-bold text-on-accent bg-accent rounded-full uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col grow">
                <div className="flex items-center gap-2 text-faint text-xs mb-4">
                  <Calendar size={14} aria-hidden="true" />
                  {formatPostDate(post.date)}
                </div>

                <h3 className="text-xl font-bold text-text-strong mb-3 group-hover:text-accent transition-colors">
                  {post.title}
                </h3>

                <p className="text-muted text-sm line-clamp-3 mb-6 grow">
                  {post.excerpt}
                </p>

                <div className="flex items-center text-accent text-sm font-medium mt-auto">
                  Lire l&apos;article{" "}
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="ml-2 transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
