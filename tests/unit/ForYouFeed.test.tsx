import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ForYouFeed } from "@/components/ForYouFeed";
import { shows } from "@/lib/catalog";
import { buildFeed } from "@/lib/feed";

describe("buildFeed", () => {
  it("incluye los 30 títulos intercalando categorías", () => {
    const feed = buildFeed();

    expect(feed).toHaveLength(shows.length);
    expect(feed[0].show.category).not.toBe(feed[1].show.category);
  });
});

describe("ForYouFeed", () => {
  it("muestra un enlace al título por cada clip", () => {
    render(<ForYouFeed />);
    expect(screen.getAllByRole("link", { name: "Ver título" })).toHaveLength(shows.length);
  });

  it("agrega un comentario nuevo", async () => {
    const user = userEvent.setup();
    render(<ForYouFeed />);

    await user.type(screen.getByPlaceholderText("Escribe un comentario…"), "¡Qué drama!");
    await user.click(screen.getByRole("button", { name: "Enviar" }));

    expect(screen.getByText("¡Qué drama!")).toBeInTheDocument();
  });

  it("da me encanta con doble toque", () => {
    const { container } = render(<ForYouFeed />);
    const [firstVideo] = container.querySelectorAll("video");

    fireEvent.doubleClick(firstVideo.parentElement!);

    expect(screen.getByText("❤")).toBeInTheDocument();
  });
});
