import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { CopyButton } from "@/components/CopyButton";

describe("CopyButton", () => {
  it("copia el texto y avisa que se copió", async () => {
    const user = userEvent.setup();
    render(<CopyButton text="¡Hola, michi!" label="Copiar prompt" context="Solicitud 1" />);

    await user.click(screen.getByRole("button", { name: "Copiar prompt: Solicitud 1" }));

    expect(await navigator.clipboard.readText()).toBe("¡Hola, michi!");
    expect(screen.getByRole("status")).toHaveTextContent("¡Copiado!");
  });
});
