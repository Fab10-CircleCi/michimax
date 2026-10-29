import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { IdeasSection } from "@/components/IdeasSection";
import { ideas } from "@/lib/ideas";

describe("ideas para seguir construyendo", () => {
  it("son 20, con títulos únicos y su pista de accesibilidad", () => {
    expect(ideas).toHaveLength(20);
    expect(new Set(ideas.map((idea) => idea.title)).size).toBe(20);
    for (const idea of ideas) {
      expect(idea.description.length, idea.title).toBeGreaterThan(30);
      expect(idea.accessibility.length, idea.title).toBeGreaterThan(30);
    }
  });

  it("muestra las reglas y una tarjeta por idea", () => {
    render(<IdeasSection />);

    const section = screen.getByRole("region", { name: "Ideas para seguir construyendo" });
    expect(within(section).getByText("No rompas el CI.")).toBeInTheDocument();
    expect(within(section).getByText("Agrega pruebas.")).toBeInTheDocument();
    expect(within(section).getAllByRole("heading", { level: 3 })).toHaveLength(20);
  });
});
