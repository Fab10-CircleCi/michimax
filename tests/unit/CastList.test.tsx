import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { CastList } from "@/components/CastList";
import { getShow } from "@/lib/catalog";

const show = getShow("the-litter")!;

function renderGallery() {
  return render(<CastList starring={show.starring} slug={show.slug} title={show.title} />);
}

describe("CastList", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("muestra una tarjeta por cada gato del reparto", () => {
    renderGallery();

    for (const nombre of show.starring) {
      expect(screen.getByText(nombre)).toBeInTheDocument();
    }
    expect(screen.getAllByRole("button", { name: /^Seguir a / })).toHaveLength(show.starring.length);
  });

  it("sigue a un gato y lo guarda en localStorage", async () => {
    const user = userEvent.setup();
    renderGallery();

    await user.click(screen.getAllByRole("button", { name: /^Seguir a / })[0]);

    expect(screen.getByRole("button", { name: `Siguiendo a ${show.starring[0]}` })).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("michimax:siguiendo") ?? "[]")).toEqual([show.starring[0]]);
  });

  it("despliega y oculta el detalle al tocar la tarjeta", async () => {
    const user = userEvent.setup();
    renderGallery();

    const toggle = screen.getByRole("button", { name: show.starring[0] });

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getAllByText(`Estrella de ${show.title}`)[0]).toBeVisible();

    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.getAllByText(`Estrella de ${show.title}`)[0]).not.toBeVisible();
  });
});
