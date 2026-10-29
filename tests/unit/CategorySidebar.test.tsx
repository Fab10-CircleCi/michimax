import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CategorySidebar } from "@/components/CategorySidebar";
import { categories } from "@/lib/catalog";

describe("CategorySidebar", () => {
  it("enlaza cada categoría con su fila en la portada", () => {
    render(<CategorySidebar />);

    const nav = screen.getByRole("navigation", { name: "Categorías" });
    const links = within(nav).getAllByRole("link");

    expect(links.map((link) => link.textContent)).toEqual(categories.map((category) => category.name));
    expect(links[0]).toHaveAttribute("href", `/#fila-${categories[0].id}`);
  });

  it("marca la categoría del título que se está viendo", () => {
    render(<CategorySidebar active="anime" />);

    expect(screen.getByRole("link", { name: "Anime y animación" })).toHaveAttribute("aria-current", "true");
    expect(screen.getByRole("link", { name: "Terror y suspenso" })).not.toHaveAttribute("aria-current");
  });
});
