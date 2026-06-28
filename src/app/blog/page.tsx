import Link from "next/link";
import Image from "next/image";
import { getSortedPostsData } from "@/lib/posts";
import { ArrowRight, Calendar } from "lucide-react";
import type { Metadata } from "next";

const SITE_URL = "https://forgedigitalesolutions.com";

export const metadata: Metadata = {
  title: "Blog : conseils web, montage PC et Linux dans le Médoc",
  description:
    "Articles concrets sur la création de sites web, le montage PC, la sécurité informatique et le passage à Linux. Conseils d'un développeur indépendant dans le Médoc et le Bassin d'Arcachon.",
  keywords: [
    "blog informatique Médoc",
    "conseils site web Gironde",
    "tutoriel Linux Mint",
    "montage PC Bordeaux",
    "sécurité informatique artisan",
  ],
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: `${SITE_URL}/blog`,
    title: "Blog : conseils web, montage PC et Linux dans le Médoc",
    description:
      "Articles concrets sur la création de sites web, le montage PC, la sécurité informatique et le passage à Linux. Conseils d'un développeur indépendant dans le Médoc.",
    siteName: "Forge Digitale Solutions",
  },
};

export default function BlogIndex() {
  const posts = getSortedPostsData();

  return (
    <div className="min-h-screen bg-bg pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-text-strong mb-6 tracking-tight">
            Le Blog de <span className="text-accent">La Forge.</span>
          </h1>
          <p className="text-muted text-lg">
            Décryptage tech, conseils hardware et coulisses du développement
            web. Des analyses concrètes pour optimiser votre matériel et votre
            stratégie digitale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="group flex flex-col h-full bg-surface-card border border-default rounded-xl overflow-hidden hover:border-strong transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-48 bg-surface-sunken relative overflow-hidden">
                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 text-xs font-bold text-on-accent bg-accent rounded-full uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col grow">
                <div className="flex items-center gap-2 text-faint text-xs mb-4">
                  <Calendar size={14} aria-hidden="true" />
                  {post.date}
                </div>

                <h2 className="text-xl font-bold text-text-strong mb-3 group-hover:text-accent transition-colors">
                  {post.title}
                </h2>

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
    </div>
  );
}
