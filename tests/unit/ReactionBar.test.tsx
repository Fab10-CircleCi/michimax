import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ReactionBar } from "@/components/ReactionBar";
import { formatearContador, getReacciones } from "@/lib/reacciones";

describe("ReactionBar", () => {
  it("muestra los cuatro botones con sus contadores", () => {
    render(<ReactionBar slug="the-midnight-prowler" />);
    const reacciones = getReacciones("the-midnight-prowler");

    expect(screen.getAllByRole("button")).toHaveLength(4);
    expect(screen.getByText(formatearContador(reacciones.comentarios))).toBeInTheDocument();
  });

  it("suma uno al dar me encanta y lo quita al volver a pulsar", async () => {
    const user = userEvent.setup();
    render(<ReactionBar slug="meowcha" />);
    const inicial = getReacciones("meowcha").meEncanta;
    const [meEncanta] = screen.getAllByRole("button");

    await user.click(meEncanta);
    expect(screen.getByText(formatearContador(inicial + 1))).toBeInTheDocument();

    await user.click(meEncanta);
    expect(screen.getByText(formatearContador(inicial))).toBeInTheDocument();
  });
});

describe("formatearContador", () => {
  it("abrevia los miles", () => {
    expect(formatearContador(999)).toBe("999");
    expect(formatearContador(1000)).toBe("1k");
    expect(formatearContador(4321)).toBe("4.3k");
  });
});
