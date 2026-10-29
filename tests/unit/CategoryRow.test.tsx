import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CategoryRow } from "@/components/CategoryRow";
import { showsInCategory } from "@/lib/catalog";

describe("CategoryRow", () => {
  it("muestra la categoría como encabezado y un enlace por título", () => {
    const anime = showsInCategory("anime");
    render(<CategoryRow id="anime" title="Anime y animación" shows={anime} />);

    const row = screen.getByRole("region", { name: "Anime y animación" });
    const links = within(row).getAllByRole("link");

    expect(links.map((link) => link.textContent)).toEqual(anime.map((show) => show.title));
    expect(links[0]).toHaveAttribute("href", `/titulos/${anime[0].slug}`);
  });
});
