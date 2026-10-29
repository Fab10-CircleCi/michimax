import type { Metadata } from "next";
import { ForYouFeed } from "@/components/ForYouFeed";

export const metadata: Metadata = {
  title: "Para ti",
  description: "Los clips de todo Michimax en un feed vertical.",
};

export default function ParaTiPage() {
  return <ForYouFeed />;
}
