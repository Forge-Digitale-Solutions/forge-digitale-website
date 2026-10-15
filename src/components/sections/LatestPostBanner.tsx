import Image from "next/image";
import Link from "next/link";
import { getLatestPostLink } from "@/lib/posts";

export async function LatestPostBanner() {
  const post = await getLatestPostLink();
  if (!post) return null;

  const href = `/blog/${post.id}/`;
  const alt = post.imageAlt || post.title;

  return (
    <aside aria-label="Dernier article du blog" className="w-full max-w-[380px]">
      {/* Desktop / lg+: stacked card in hero right column */}
      <div className="hidden border border-default bg-surface-card lg:block">
        <div className="border-b border-default px-4 py-3">
          <p className="fds-eyebrow mb-0">Dernier article · Blog</p>
        </div>
        {post.image ? (
          <Link
            href={href}
            className="relative block aspect-[16/10] overflow-hidden border-b border-default bg-surface-sunken focus-visible:outline-1 focus-visible:outline-accent"
          >
            <Image
              src={post.image}
              alt={alt}
              fill
              sizes="380px"
              className="object-cover"
            />
          </Link>
        ) : null}
        <div className="flex flex-col gap-3 px-4 py-4">
          <Link
            href={href}
            className="group focus-visible:outline-1 focus-visible:outline-accent rounded"
          >
            <h2 className="font-display text-lg font-bold leading-snug text-text-strong line-clamp-2 group-hover:text-accent transition-colors">
              {post.title}
            </h2>
          </Link>
          <p className="text-xs text-faint">{post.date}</p>
          <div className="flex items-center justify-between gap-3 pt-1">
            <Link
              href={href}
              className="text-sm font-medium text-accent hover:opacity-90 focus-visible:outline-1 focus-visible:outline-accent rounded transition-opacity"
            >
              Lire →
            </Link>
            <Link
              href="/blog/"
              className="text-xs text-soft hover:text-accent focus-visible:text-accent focus-visible:outline-1 focus-visible:outline-accent rounded transition-colors"
            >
              Tous les articles
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile / tablet: compact row under trust checklist */}
      <div className="flex items-stretch gap-3 border border-default bg-surface-card p-3 lg:hidden">
        {post.image ? (
          <Link
            href={href}
            className="relative h-[72px] w-[72px] shrink-0 overflow-hidden border border-default bg-surface-sunken focus-visible:outline-1 focus-visible:outline-accent"
          >
            <Image
              src={post.image}
              alt={alt}
              fill
              sizes="72px"
              className="object-cover"
            />
          </Link>
        ) : null}
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
          <p className="fds-eyebrow mb-0">Dernier article · Blog</p>
          <Link
            href={href}
            className="focus-visible:outline-1 focus-visible:outline-accent rounded"
          >
            <h2 className="text-sm font-bold leading-snug text-text-strong line-clamp-2">
              {post.title}
            </h2>
          </Link>
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs text-faint">{post.date}</span>
            <Link
              href={href}
              className="shrink-0 text-sm font-medium text-accent hover:opacity-90 focus-visible:outline-1 focus-visible:outline-accent rounded transition-opacity"
            >
              Lire →
            </Link>
          </div>
          <Link
            href="/blog/"
            className="text-xs text-soft hover:text-accent focus-visible:text-accent focus-visible:outline-1 focus-visible:outline-accent rounded transition-colors"
          >
            Tous les articles
          </Link>
        </div>
      </div>
    </aside>
  );
}
