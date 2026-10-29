import { categories, showsInCategory, type Show } from "./catalog";

export type FeedItem = {
  id: string;
  show: Show;
};

/** Mezcla los títulos intercalando categorías (orden estable para no romper la hidratación). */
export function buildFeed(): FeedItem[] {
  const rows = categories.map((category) => showsInCategory(category.id));
  const longest = Math.max(...rows.map((row) => row.length));
  const items: FeedItem[] = [];

  for (let index = 0; index < longest; index += 1) {
    for (const row of rows) {
      const show = row[index];
      if (show) items.push({ id: show.slug, show });
    }
  }

  return items;
}

export const fakeComments = [
  { author: "Gatúbela_MX", text: "¡No puedo con este final! 😾" },
  { author: "Bigotes1987", text: "Me la vi completa en una sola siesta." },
  { author: "LaReinaDelSofá", text: "Este reparto merece un premio felino." },
];
