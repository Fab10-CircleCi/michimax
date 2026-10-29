import { CatalogShell } from "@/components/CatalogShell";
import { CategoryRow } from "@/components/CategoryRow";
import { Hero } from "@/components/Hero";
import { categories, featuredSlug, getShow, showsInCategory } from "@/lib/catalog";

export default function HomePage() {
  const featured = getShow(featuredSlug)!;

  return (
    <CatalogShell>
      <h1 className="visually-hidden">Michimax: series, películas y documentales felinos</h1>
      <Hero show={featured} />
      {categories.map((category) => (
        <CategoryRow
          key={category.id}
          id={category.id}
          title={category.name}
          shows={showsInCategory(category.id)}
        />
      ))}
    </CatalogShell>
  );
}
