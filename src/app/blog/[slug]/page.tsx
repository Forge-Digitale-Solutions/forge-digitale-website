import { getPostData, getSortedPostsData } from "@/lib/posts";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

const SITE_URL = "https://forgedigitalesolutions.com";

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

  const articleUrl = `${SITE_URL}/blog/${slug}/`;
  const articleImage = postData.image
    ? `${SITE_URL}${postData.image}`
    : `${SITE_URL}/images/og-image.jpg`;

  return {
    metadataBase: new URL(SITE_URL),
    title: { absolute: postData.title },
    description:
      postData.excerpt ||
      `Article sur ${postData.category} - ${postData.title}`,
    keywords: [
      postData.title,
      postData.category,
      "blog",
      "Forge Digitale",
      "Médoc",
    ],
    authors: [{ name: "Anthony Marcelin" }],
    alternates: {
      canonical: articleUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "article",
      locale: "fr_FR",
      url: articleUrl,
      title: postData.title,
      description:
        postData.excerpt || `Article sur ${postData.category}`,
      siteName: "Forge Digitale Solutions",
      publishedTime: postData.date,
      authors: ["Anthony Marcelin"],
      images: [
        {
          url: articleImage,
          width: 1200,
          height: 630,
          alt: postData.title,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: postData.title,
      description:
        postData.excerpt || `Article sur ${postData.category}`,
      images: [articleImage],
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
  const otherPosts = getSortedPostsData().filter((post) => post.id !== slug);
  const relatedPosts = [
    ...otherPosts.filter((post) => post.category === postData.category),
    ...otherPosts.filter((post) => post.category !== postData.category),
  ].slice(0, 3);

  return (
    <article className="min-h-screen bg-dark-base pt-32 pb-24">
      <ArticleSchema
        title={postData.title}
        description={postData.excerpt || postData.title}
        datePublished={postData.date}
        dateModified={postData.lastModified}
        image={
          postData.image ? `https://forgedigitalesolutions.com${postData.image}` : undefined
        }
        slug={slug}
        category={postData.category}
      />
      <BreadcrumbSchema
        items={[
          { name: "Accueil", url: `${SITE_URL}/` },
          { name: "Blog", url: `${SITE_URL}/blog/` },
          { name: postData.title, url: `${SITE_URL}/blog/${slug}/` },
        ]}
      />

      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <Link
          href="/blog/"
          className="inline-flex items-center text-slate-400 hover:text-[#C5A059] transition-colors mb-8 text-sm group"
        >
          <ArrowLeft
            size={16}
            aria-hidden="true"
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

        <aside className="mt-14 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-bold text-white">À propos de l’auteur</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Anthony Marcelin est développeur web et technicien informatique à
            Saint-Laurent-Médoc. Il accompagne particuliers, artisans et petites
            entreprises sur leurs sites, leur matériel et leurs usages de Linux.
          </p>
          <Link
            href="/#about"
            className="mt-3 inline-block text-sm font-medium text-[#C5A059] hover:underline"
          >
            Découvrir Forge Digitale Solutions
          </Link>
        </aside>

        <aside className="mt-12" aria-labelledby="related-articles-title">
          <h2 id="related-articles-title" className="text-xl font-bold text-white">
            À lire aussi
          </h2>
          <ul className="mt-4 space-y-3">
            {relatedPosts.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/blog/${post.id}/`}
                  className="text-[#C5A059] hover:underline"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <div className="mt-16 pt-8 border-t border-white/10">
          <h3 className="text-white font-bold mb-4">
            Une question sur cet article ?
          </h3>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/#contact"
            className="inline-block bg-[#C5A059] text-dark-base font-bold px-6 py-3 rounded-full hover:bg-[#D4B475] transition-colors"
          >
            Contactez La Forge
          </a>
        </div>
      </div>
    </article>
  );
}
