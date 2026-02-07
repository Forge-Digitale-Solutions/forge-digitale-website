import Link from "next/link";
import Image from "next/image";
import { getSortedPostsData } from "@/lib/posts";
import { ArrowRight, Calendar } from "lucide-react";

export default function BlogIndex() {
  const posts = getSortedPostsData();

  return (
    <div className="min-h-screen bg-dark-base pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Le Blog de <span className="text-gold-gradient">La Forge.</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Décryptage tech, conseils hardware et coulisses du développement
            web. Vulgarisé pour tous, sans jargon inutile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="group flex flex-col h-full bg-white/5 border border-white/5 rounded-3xl overflow-hidden hover:border-[#C5A059]/30 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-48 bg-linear-to-br from-slate-800 to-black relative overflow-hidden">
                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 text-xs font-bold text-dark-base bg-[#C5A059] rounded-full uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col grow">
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-4">
                  <Calendar size={14} />
                  {post.date}
                </div>

                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-[#C5A059] transition-colors">
                  {post.title}
                </h2>

                <p className="text-slate-400 text-sm line-clamp-3 mb-6 grow">
                  {post.excerpt}
                </p>

                <div className="flex items-center text-[#C5A059] text-sm font-medium mt-auto">
                  Lire l&apos;article{" "}
                  <ArrowRight
                    size={16}
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
