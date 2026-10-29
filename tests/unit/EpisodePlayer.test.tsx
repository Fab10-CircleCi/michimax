import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { EpisodePlayer } from "@/components/EpisodePlayer";
import { getTelenovela } from "@/lib/telenovelas";

const telenovela = getTelenovela("michimar")!;

describe("EpisodePlayer", () => {
  it("empieza en el capítulo 1 con subtítulos en español", () => {
    const { container } = render(<EpisodePlayer telenovela={telenovela} />);

    expect(container.querySelector("source")).toHaveAttribute("src", "/videos/michimar-1.mp4");
    expect(container.querySelector("track")).toHaveAttribute("srclang", "es-MX");
    expect(screen.getByRole("button", { name: /Cap\. 1/ })).toHaveAttribute("aria-current", "true");
  });

  it("cambia de capítulo al elegir otro", async () => {
    const user = userEvent.setup();
    const { container } = render(<EpisodePlayer telenovela={telenovela} />);

    await user.click(screen.getByRole("button", { name: /Cap\. 3/ }));

    expect(container.querySelector("source")).toHaveAttribute("src", "/videos/michimar-3.mp4");
    expect(screen.getByRole("button", { name: /Cap\. 3/ })).toHaveAttribute("aria-current", "true");
    expect(screen.getByRole("button", { name: /Cap\. 1/ })).not.toHaveAttribute("aria-current");
    expect(screen.getByText(/Reproduciendo: capítulo 3/)).toBeInTheDocument();
  });
});
