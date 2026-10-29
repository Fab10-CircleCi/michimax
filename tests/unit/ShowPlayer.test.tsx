import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ShowPlayer } from "@/components/ShowPlayer";
import { getShow } from "@/lib/catalog";

const show = getShow("the-midnight-prowler")!;

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
});
