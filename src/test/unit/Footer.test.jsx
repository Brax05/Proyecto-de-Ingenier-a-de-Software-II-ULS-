// src/test/unit/Footer.test.jsx
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import Footer from "../../components/Footer";

describe("Footer", () => {
  test("renderiza logos y texto institucional", () => {
    render(<Footer />);

    // Logos por alt
    expect(screen.getByAltText(/logo dgae uls/i)).toBeInTheDocument();
    expect(screen.getByAltText(/logo universidad de la serena/i)).toBeInTheDocument();

    // Información central: buscamos específicamente el heading
    expect(screen.getByRole("heading", { name: /universidad de la serena/i })).toBeInTheDocument();

    expect(
        screen.getByText(/dirección general de asuntos estudiantiles/i)
    ).toBeInTheDocument();

    expect(
        screen.getByText(/benavente 1085, 1720197 la serena, coquimbo/i)
    ).toBeInTheDocument();
  });


  test("usa landmark de contenido (footer -> role contentinfo)", () => {
    render(<Footer />);
    // <footer> expone role contentinfo
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  test("muestra el año dinámico según la fecha del sistema", () => {
    // Congelamos el tiempo para probar el año
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2027-03-15T12:00:00Z"));

    render(<Footer />);

    // Rango de años
    expect(screen.getByText(/1981 - 2027/i)).toBeInTheDocument();
    // Línea de copyright
    expect(
      screen.getByText(/©\s*2027\s*Todos los derechos reservados/i)
    ).toBeInTheDocument();

    vi.useRealTimers();
  });
});
