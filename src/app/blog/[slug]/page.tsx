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

  const articleUrl = `${SITE_URL}/blog/${slug}`;
  const articleImage = postData.image
    ? `${SITE_URL}${postData.image}`
    : `${SITE_URL}/images/og-image.jpg`;

  return {
    metadataBase: new URL(SITE_URL),
    title: postData.title,
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

  return (
    <article className="min-h-screen bg-bg pt-32 pb-24">
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
          href="/blog"
          className="inline-flex items-center text-muted hover:text-accent transition-colors mb-8 text-sm group"
        >
          <ArrowLeft
            size={16}
            aria-hidden="true"
            className="mr-2 transition-transform group-hover:-translate-x-1"
          />
          Retour au blog
        </Link>

        <header className="mb-12">
          <span className="text-accent font-bold tracking-widest uppercase text-xs mb-4 block">
            {postData.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-text-strong mb-6 leading-tight">
            {postData.title}
          </h1>
          <div className="flex items-center gap-4 text-faint text-sm border-l-2 border-accent pl-4 mb-8">
            <p>Publié le {postData.date}</p>
            <span>•</span>
            <p>Par Anthony Marcelin</p>
          </div>
          {postData.image && (
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
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
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml || "" }}
        />

        <div className="mt-16 pt-8 border-t border-default">
          <h3 className="text-text-strong font-bold mb-4">
            Une question sur cet article ?
          </h3>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/#contact"
            className="btn-primary px-6 py-3"
          >
            Contactez La Forge
          </a>
        </div>
      </div>
    </article>
  );
}
