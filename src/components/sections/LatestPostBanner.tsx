import Link from "next/link";
import { getLatestPostLink } from "@/lib/posts";

export async function LatestPostBanner() {
  const post = await getLatestPostLink();
  if (!post) return null;

  return (
    <aside
      className="border-y border-default bg-bg"
      aria-label="Dernier article du blog"
    >
      <div className="container mx-auto flex h-9 items-center justify-between gap-4 px-4 text-xs text-faint md:px-6">
        <Link
          href={`/blog/${post.id}/`}
          className="min-w-0 truncate hover:text-accent focus-visible:text-accent focus-visible:outline-1 focus-visible:outline-accent rounded transition-colors"
        >
          Nouveau sur le blog :{" "}
          <span className="text-soft">{post.title}</span>
          {" → "}
          Lire
        </Link>
        <Link
          href="/blog/"
          className="shrink-0 hover:text-accent focus-visible:text-accent focus-visible:outline-1 focus-visible:outline-accent rounded transition-colors"
        >
          Tous les articles
        </Link>
      </div>
    </aside>
  );
}
