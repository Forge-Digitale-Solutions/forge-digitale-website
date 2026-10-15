import Link from "next/link";
import { getLatestPostLink } from "@/lib/posts";

export async function LatestPostBanner() {
  const post = await getLatestPostLink();
  if (!post) return null;

  return (
    <aside
      className="border-t border-default"
      aria-label="Dernier article du blog"
    >
      <div className="flex h-10 items-center justify-between gap-4 text-[15px] text-text-strong md:text-base">
        <Link
          href={`/blog/${post.id}/`}
          className="flex min-w-0 items-center gap-2 hover:opacity-90 focus-visible:outline-1 focus-visible:outline-accent rounded transition-opacity"
        >
          <span className="shrink-0 text-accent">Nouveau</span>
          <span className="min-w-0 truncate font-medium">{post.title}</span>
          <span className="shrink-0 text-accent">Lire →</span>
        </Link>
        <Link
          href="/blog/"
          className="hidden shrink-0 text-soft hover:text-accent focus-visible:text-accent focus-visible:outline-1 focus-visible:outline-accent rounded transition-colors sm:inline"
        >
          Tous les articles
        </Link>
      </div>
    </aside>
  );
}
