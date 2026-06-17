"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import type { PlaceInfo } from "@/lib/google-reviews";

const SWIPE_THRESHOLD = 50;

function computeRelativeTime(isoDate: string): string {
  const days = Math.floor((Date.now() - new Date(isoDate).getTime()) / 86_400_000);
  if (days === 0) return "aujourd'hui";
  if (days === 1) return "il y a 1 jour";
  if (days < 7) return `il y a ${days} jours`;
  const weeks = Math.floor(days / 7);
  if (weeks === 1) return "il y a 1 semaine";
  if (weeks < 5) return `il y a ${weeks} semaines`;
  const months = Math.floor(days / 30);
  if (months === 1) return "il y a 1 mois";
  return `il y a ${months} mois`;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`Note : ${rating} sur 5`}>
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

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

export function Reviews({ data }: { data: PlaceInfo | null }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [paused, setPaused] = useState(false);
  const [relativeTimes, setRelativeTimes] = useState<string[]>([]);

  useEffect(() => {
    setRelativeTimes(
      (data?.reviews ?? []).map((r) =>
        r.date ? computeRelativeTime(r.date) : r.relativeTime
      )
    );
  }, [data]);

  const { reviews, rating, totalRatings, placeId } = data ?? { reviews: [], rating: 0, totalRatings: 0, placeId: "" };
  const count = reviews.length;

  const go = useCallback((next: number, manual = false) => {
    if (manual) {
      setPaused(true);
      setTimeout(() => setPaused(false), 8000);
    }
    setDirection(next > current ? 1 : -1);
    setCurrent((next + count) % count);
  }, [current, count]);

  useEffect(() => {
    if (count <= 1 || paused) return;
    const id = setInterval(() => go(current + 1), 5000);
    return () => clearInterval(id);
  }, [current, count, paused, go]);

  if (!data || count === 0) return null;

  const googleUrl = placeId
    ? `https://www.google.com/maps/search/?api=1&query=Forge+Digitale+Solutions&query_place_id=${placeId}`
    : "https://www.google.com/maps/place/Forge+Digitale+Solutions/@44.8901966,-0.4729263,17z/data=!3m1!1e3!4m6!3m5!1s0xa3f788f259db0a87:0xeb74be8318b2b4e4!8m2!3d44.8901966!4d-0.4729263!16s%2Fg%2F11zbjsx1hc";

  const review = reviews[current];

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
            <span className="text-gold-gradient">mes clients</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-6">
            <StarRating rating={Math.round(rating)} />
            <span className="text-slate-300 text-lg">
              <span className="text-white font-bold">{rating.toFixed(1)}</span>{" "}
              / 5 · {totalRatings} avis Google
            </span>
          </div>
        </motion.div>

        <div className="max-w-2xl mx-auto" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="relative">
            {count > 1 && (
              <>
                <button
                  onClick={() => go(current - 1, true)}
                  className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 z-10 w-10 h-10 rounded-full border border-[#C5A059]/30 bg-slate-900/80 items-center justify-center text-[#C5A059] hover:bg-[#C5A059]/10 transition-colors"
                  aria-label="Avis précédent"
                >
                  <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  onClick={() => go(current + 1, true)}
                  className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 z-10 w-10 h-10 rounded-full border border-[#C5A059]/30 bg-slate-900/80 items-center justify-center text-[#C5A059] hover:bg-[#C5A059]/10 transition-colors"
                  aria-label="Avis suivant"
                >
                  <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </>
            )}

            <div className="overflow-hidden rounded-2xl">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  drag={count > 1 ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.1}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -SWIPE_THRESHOLD) go(current + 1, true);
                    else if (info.offset.x > SWIPE_THRESHOLD) go(current - 1, true);
                  }}
                  className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 relative select-none cursor-grab active:cursor-grabbing"
                >
                  <span
                    className="absolute top-6 right-8 text-[#C5A059]/20 text-7xl font-serif leading-none select-none"
                    aria-hidden="true"
                  >
                    &ldquo;
                  </span>

                  <StarRating rating={review.rating} />

                  <p className="text-slate-200 text-lg leading-relaxed mt-4 mb-6 min-h-24">
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
                        {relativeTimes[current] ?? review.relativeTime}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {count > 1 && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => go(current - 1, true)}
                className="md:hidden w-8 h-8 rounded-full border border-[#C5A059]/30 bg-slate-900/80 flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059]/10 transition-colors"
                aria-label="Avis précédent"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </button>

              <div className="flex gap-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i, true)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === current
                        ? "bg-[#C5A059] w-6"
                        : "bg-slate-600 hover:bg-slate-400 w-2"
                    }`}
                    aria-label={`Aller à l'avis ${i + 1}`}
                    aria-current={i === current ? "true" : undefined}
                  />
                ))}
              </div>

              <button
                onClick={() => go(current + 1, true)}
                className="md:hidden w-8 h-8 rounded-full border border-[#C5A059]/30 bg-slate-900/80 flex items-center justify-center text-[#C5A059] hover:bg-[#C5A059]/10 transition-colors"
                aria-label="Avis suivant"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          )}
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
