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
    expect(screen.getAllByRole("button", { name: "Seguir" })).toHaveLength(show.starring.length);
  });

  it("sigue a un gato y lo guarda en localStorage", async () => {
    const user = userEvent.setup();
    renderGallery();

    await user.click(screen.getAllByRole("button", { name: "Seguir" })[0]);

    expect(screen.getByRole("button", { name: "Siguiendo" })).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("michimax:siguiendo") ?? "[]")).toEqual([show.starring[0]]);
  });

  it("despliega y oculta el detalle al tocar la tarjeta", async () => {
    const user = userEvent.setup();
    renderGallery();

    await user.click(screen.getByText(show.starring[0]));
    expect(screen.getByText(`Estrella de ${show.title}`)).toBeInTheDocument();

    await user.click(screen.getByText(show.starring[0]));
    expect(screen.queryByText(`Estrella de ${show.title}`)).not.toBeInTheDocument();
  });
});
