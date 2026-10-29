import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ShowPlayer } from "@/components/ShowPlayer";
import { getShow } from "@/lib/catalog";

const show = getShow("the-midnight-prowler")!;

function mockReducedMotion(reduce: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({ matches: reduce && query.includes("reduce") }));
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("ShowPlayer", () => {
  it("carga el clip del título con su póster y subtítulos", () => {
    const { container } = render(<ShowPlayer show={show} />);
    const video = container.querySelector("video");

    expect(video).toHaveAttribute("poster", "/titulos/the-midnight-prowler/still-1.webp");
    expect(container.querySelector("source")).toHaveAttribute("src", "/titulos/the-midnight-prowler/clip.mp4");
    expect(container.querySelector("track")).toHaveAttribute("srclang", "es-MX");
  });

  it("nombra el video y lo describe en texto porque no tiene audio", () => {
    render(<ShowPlayer show={show} />);

    const video = screen.getByLabelText("Clip de The Midnight Prowler");
    expect(video).toHaveAccessibleDescription(/sin audio/);
    expect(screen.getByText(show.clipDescription, { exact: false })).toBeInTheDocument();
  });

  it("se reproduce solo y sin sonido al entrar", () => {
    mockReducedMotion(false);
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
    const { container } = render(<ShowPlayer show={show} />);

    expect(play).toHaveBeenCalledTimes(1);
    expect((container.querySelector("video") as HTMLVideoElement).muted).toBe(true);
    expect(container.querySelector("video")).toHaveAttribute("controls");
  });

  it("no se reproduce solo si la persona pidió menos movimiento", () => {
    mockReducedMotion(true);
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
    render(<ShowPlayer show={show} />);

    expect(play).not.toHaveBeenCalled();
  });
});
