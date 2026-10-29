import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { NewsletterForm } from "@/components/NewsletterForm";
import { shows } from "@/lib/catalog";

describe("NewsletterForm", () => {
  it("lista todos los títulos como favoritos posibles", () => {
    render(<NewsletterForm />);
    for (const show of shows) {
      expect(screen.getByRole("option", { name: show.title })).toBeInTheDocument();
    }
  });

  it("rechaza un correo inválido", async () => {
    const user = userEvent.setup();
    render(<NewsletterForm />);

    await user.type(screen.getByPlaceholderText("tu@correo.com"), "michi-sin-arroba");
    await user.click(screen.getByRole("button", { name: "Suscribirme" }));

    expect(screen.getByText("Ese correo no parece válido.")).toBeInTheDocument();
  });

  it("da la bienvenida al suscribirse", async () => {
    const user = userEvent.setup();
    render(<NewsletterForm />);

    await user.type(screen.getByPlaceholderText("tu@correo.com"), "paola@michon.mx");
    await user.click(screen.getByRole("button", { name: "Suscribirme" }));

    expect(screen.getByText("¡Bienvenida al chisme!")).toBeInTheDocument();
  });

  it("cada campo tiene su etiqueta visible", () => {
    render(<NewsletterForm />);

    expect(screen.getByLabelText("Correo electrónico")).toHaveAttribute("type", "email");
    expect(screen.getByLabelText("Título favorito").tagName).toBe("SELECT");
    expect(screen.getByLabelText("Acepto recibir el boletín")).toHaveAttribute("type", "checkbox");
  });

  it("asocia el error al campo de correo y lo anuncia", async () => {
    const user = userEvent.setup();
    render(<NewsletterForm />);

    await user.type(screen.getByLabelText("Correo electrónico"), "michi-sin-arroba");
    await user.click(screen.getByRole("button", { name: "Suscribirme" }));

    expect(screen.getByRole("alert")).toHaveTextContent("Ese correo no parece válido.");
    expect(screen.getByLabelText("Correo electrónico")).toHaveAccessibleDescription("Ese correo no parece válido.");
  });
});
