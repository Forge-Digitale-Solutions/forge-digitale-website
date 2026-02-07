import { getPostData, getSortedPostsData } from "@/lib/posts";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const postData = await getPostData(slug);

  return {
    title: postData.title,
    description:
      postData.excerpt ||
      `Article sur ${postData.category} - ${postData.title}`,
    openGraph: {
      title: postData.title,
      description: postData.excerpt || `Article sur ${postData.category}`,
      type: "article",
      publishedTime: postData.date,
      authors: ["Anthony Marcelin"],
      url: `https://forgedigitalesolutions.com/blog/${slug}`,
    },
  };
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const postData = await getPostData(slug);

  return (
    <article className="min-h-screen bg-dark-base pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <Link
          href="/blog"
          className="inline-flex items-center text-slate-400 hover:text-[#C5A059] transition-colors mb-8 text-sm group"
        >
          <ArrowLeft
            size={16}
            className="mr-2 transition-transform group-hover:-translate-x-1"
          />
          Retour au blog
        </Link>

        <header className="mb-12">
          <span className="text-[#C5A059] font-bold tracking-widest uppercase text-xs mb-4 block">
            {postData.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {postData.title}
          </h1>
          <div className="flex items-center gap-4 text-slate-500 text-sm border-l-2 border-[#C5A059] pl-4 mb-8">
            <p>Publié le {postData.date}</p>
            <span>•</span>
            <p>Par Anthony Marcelin</p>
          </div>
          {postData.image && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
              <Image
                src={postData.image}
                alt={postData.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </header>

        <div
          className="prose prose-invert prose-lg max-w-none 
          prose-headings:text-white prose-headings:font-bold
          prose-p:text-slate-300 prose-p:leading-relaxed
          prose-a:text-[#C5A059] prose-a:no-underline hover:prose-a:underline
          prose-strong:text-white prose-strong:font-bold
          prose-li:text-slate-300
          prose-blockquote:border-l-[#C5A059] prose-blockquote:text-slate-400 prose-blockquote:italic"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml || "" }}
        />

        <div className="mt-16 pt-8 border-t border-white/10">
          <h3 className="text-white font-bold mb-4">
            Une question sur cet article ?
          </h3>
          <Link
            href="/#contact"
            className="inline-block bg-[#C5A059] text-dark-base font-bold px-6 py-3 rounded-full hover:bg-[#D4B475] transition-colors"
          >
            Contactez La Forge
          </Link>
        </div>
      </div>
    </article>
  );
}
