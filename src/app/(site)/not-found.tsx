import type { Metadata } from "next";
import { NotFoundScreen } from "@/components/NotFoundScreen";
import { notFoundMetadata } from "@/lib/not-found-metadata";

export const metadata: Metadata = notFoundMetadata;

export default function NotFound() {
  return <NotFoundScreen />;
}
