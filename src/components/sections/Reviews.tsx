"use client";

import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";
import Image from "next/image";
import type { PlaceInfo } from "@/lib/google-reviews";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`Note : ${rating} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i < rating ? "fill-[#C5A059] text-[#C5A059]" : "text-slate-600"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

type ReviewsProps = {
  data: PlaceInfo | null;
};

export function Reviews({ data }: ReviewsProps) {
  if (!data || data.reviews.length === 0) return null;

  const googleUrl = data.placeId
    ? `https://www.google.com/maps/search/?api=1&query=Forge+Digitale+Solutions&query_place_id=${data.placeId}`
    : "https://www.google.com/maps/place/Forge+Digitale+Solutions/@44.8901966,-0.4729263,17z/data=!3m1!1e3!4m6!3m5!1s0xa3f788f259db0a87:0xeb74be8318b2b4e4!8m2!3d44.8901966!4d-0.4729263!16s%2Fg%2F11zbjsx1hc";

  return (
    <section
      id="avis"
      className="py-24 relative overflow-hidden bg-dark-base"
      aria-labelledby="reviews-heading"
    >
      <div className="absolute inset-0 bg-[#C5A059]/3 blur-[200px] -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#C5A059] font-bold tracking-widest uppercase text-sm">
            Avis clients
          </span>
          <h2
            id="reviews-heading"
            className="text-3xl md:text-4xl font-bold text-white mt-2"
          >
            Ce que disent{" "}
            <span className="text-gold-gradient">nos clients</span>
          </h2>

          <div className="flex items-center justify-center gap-3 mt-6">
            <StarRating rating={Math.round(data.rating)} />
            <span className="text-slate-300 text-lg">
              <span className="text-white font-bold">
                {data.rating.toFixed(1)}
              </span>{" "}
              / 5 · {data.totalRatings} avis Google
            </span>
          </div>
        </motion.div>

        <div className="max-w-3xl mx-auto grid gap-6">
          {data.reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 relative"
            >
              <span
                className="absolute top-6 right-8 text-[#C5A059]/20 text-7xl font-serif leading-none select-none"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              <StarRating rating={review.rating} />

              <p className="text-slate-200 text-lg leading-relaxed mt-4 mb-6">
                {review.text}
              </p>

              <div className="flex items-center gap-3">
                {review.authorPhotoUrl && (
                  <Image
                    src={review.authorPhotoUrl}
                    alt={review.authorName}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="text-white font-semibold">
                    {review.authorName}
                  </p>
                  <p className="text-slate-500 text-sm">
                    {review.relativeTime}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#C5A059] hover:text-white transition-colors text-sm font-medium"
          >
            Voir tous les avis sur Google
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
