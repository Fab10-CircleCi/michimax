import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SugerenciasPage from "@/app/sugerencias/page";
import { ideas } from "@/lib/ideas";

describe("sugerencias para seguir construyendo", () => {
  it("son 20 ideas con títulos únicos y su pista de accesibilidad", () => {
    expect(ideas).toHaveLength(20);
    expect(new Set(ideas.map((idea) => idea.title)).size).toBe(20);
    for (const idea of ideas) {
      expect(idea.description.length, idea.title).toBeGreaterThan(30);
      expect(idea.accessibility.length, idea.title).toBeGreaterThan(30);
    }
  });

  it("la página muestra las reglas y una tarjeta por idea", () => {
    render(<SugerenciasPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Sugerencias para seguir construyendo" })).toBeInTheDocument();
    expect(screen.getByText("No rompas el CI.")).toBeInTheDocument();
    expect(screen.getByText("Agrega pruebas.")).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(20);
  });
});
