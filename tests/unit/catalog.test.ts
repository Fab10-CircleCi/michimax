import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  CLIP_CAPTIONS_PATH,
  categories,
  clipPath,
  featuredSlug,
  getShow,
  shows,
  showsInCategory,
  stillPath,
} from "@/lib/catalog";

const publicDir = join(process.cwd(), "public");

describe("catálogo", () => {
  it("tiene 30 títulos con slugs únicos", () => {
    const slugs = shows.map((show) => show.slug);
    expect(shows).toHaveLength(30);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("cada categoría tiene tres títulos y todo título pertenece a una categoría", () => {
    for (const category of categories) {
      expect(showsInCategory(category.id)).toHaveLength(3);
    }
    const ids = new Set(categories.map((category) => category.id));
    expect(shows.every((show) => ids.has(show.category))).toBe(true);
  });

  it("cada título tiene textos completos y descripciones para el clip y los fotogramas", () => {
    for (const show of shows) {
      expect(show.tagline, show.slug).not.toBe("");
      expect(show.synopsis, show.slug).not.toBe("");
      expect(show.clipDescription, show.slug).not.toBe("");
      expect(show.starring.length, show.slug).toBeGreaterThan(0);
      expect(show.match, show.slug).toBeGreaterThanOrEqual(0);
      expect(show.match, show.slug).toBeLessThanOrEqual(100);
      for (const alt of show.stills) {
        expect(alt.length, show.slug).toBeGreaterThan(10);
      }
    }
  });

  it("cada título tiene su clip y sus tres fotogramas en public/", () => {
    for (const show of shows) {
      const files = [clipPath(show.slug), stillPath(show.slug, 1), stillPath(show.slug, 2), stillPath(show.slug, 3)];
      for (const file of files) {
        expect(existsSync(join(publicDir, file)), file).toBe(true);
      }
    }
    expect(existsSync(join(publicDir, CLIP_CAPTIONS_PATH))).toBe(true);
  });

  it("el título destacado existe", () => {
    expect(getShow(featuredSlug)).toBeDefined();
    expect(getShow("no-existe")).toBeUndefined();
  });
});
