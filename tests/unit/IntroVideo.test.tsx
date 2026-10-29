import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { IntroVideo } from "@/components/IntroVideo";

function mockReducedMotion(reduce: boolean) {
  vi.stubGlobal("matchMedia", (query: string) => ({ matches: reduce && query.includes("reduce") }));
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("IntroVideo", () => {
  it("se reproduce sola y sin sonido al cargar la portada", () => {
    mockReducedMotion(false);
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
    render(<IntroVideo />);

    expect(play).toHaveBeenCalledTimes(1);
    expect((screen.getByLabelText("Intro de Michimax") as HTMLVideoElement).muted).toBe(true);
  });

  it("no se reproduce sola si la persona pidió menos movimiento", () => {
    mockReducedMotion(true);
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
    render(<IntroVideo />);

    expect(play).not.toHaveBeenCalled();
  });

  it("se repite desde el inicio y con sonido al hacer clic", async () => {
    mockReducedMotion(true);
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
    const user = userEvent.setup();
    render(<IntroVideo />);
    const video = screen.getByLabelText("Intro de Michimax") as HTMLVideoElement;
    video.currentTime = 3;

    await user.click(video);

    expect(play).toHaveBeenCalledTimes(1);
    expect(video.currentTime).toBe(0);
    expect(video.muted).toBe(false);
  });

  it("tiene un botón para repetirla con el teclado", async () => {
    mockReducedMotion(true);
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
    const user = userEvent.setup();
    render(<IntroVideo />);

    await user.click(screen.getByRole("button", { name: "Repetir intro" }));

    expect(play).toHaveBeenCalledTimes(1);
  });
});

describe("IntroVideo al terminar", () => {
  it("se queda en el cuadro del logo", () => {
    mockReducedMotion(true);
    render(<IntroVideo />);
    const video = screen.getByLabelText("Intro de Michimax") as HTMLVideoElement;
    video.currentTime = 4.1;

    video.dispatchEvent(new Event("ended"));

    expect(video.currentTime).toBe(3.6);
  });
});
