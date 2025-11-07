// src/test/unit/Header.test.jsx
import { vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Header from "../../components/Header";

// Mock de componentes secundarios para simplificar el test
vi.mock("../../components/InstagramIcon", () => ({
  default: (props) => <svg data-testid="ig-icon" {...props} />,
}));

// Mock de Modal: renderiza children solo cuando isOpen = true
vi.mock("../../components/Modal", () => ({
  default: ({ isOpen, onClose, children }) =>
    isOpen ? (
      <div role="dialog" aria-modal="true">
        {children}
        <button onClick={onClose}>Cerrar</button>
      </div>
    ) : null,
}));

function renderHeader() {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
}

test("renderiza logo y títulos principales", () => {
  renderHeader();
  expect(screen.getByAltText(/logo uls/i)).toBeInTheDocument();
  expect(screen.getByText(/universidad de la serena/i)).toBeInTheDocument();
  expect(
    screen.getByText(/casinos y servicios de alimentación/i)
  ).toBeInTheDocument();
});

test("muestra enlaces de navegación básicos", () => {
  renderHeader();
  // En JSDOM no se aplica Tailwind, así que desktop/móvil coexisten en DOM:
  expect(screen.getAllByRole("link", { name: /inicio/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: /productos/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: /noticias/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole("link", { name: /gestión/i }).length).toBeGreaterThan(0);
});

test("al pulsar 'Contacto' se abre el modal con la info de contacto y luego puede cerrarse", async () => {
  const user = userEvent.setup();
  renderHeader();

  // Limitar la búsqueda al <nav> (botón de escritorio) para evitar duplicados
  const nav = screen.getByRole("navigation");
  await user.click(within(nav).getByRole("button", { name: /contacto/i }));

  expect(await screen.findByRole("dialog")).toBeInTheDocument();
  expect(screen.getByText(/información de contacto/i)).toBeInTheDocument();
  expect(screen.getByText(/casinouls@userena\.cl/i)).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: /cerrar/i }));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("el botón hamburguesa alterna el icono (menú móvil cerrado/abierto)", async () => {
  const user = userEvent.setup();
  const { container } = renderHeader();

  // Icono hamburguesa (3 líneas)
  expect(
    container.querySelector('path[d="M4 6h16M4 12h16m-7 6h7"]')
  ).toBeTruthy();

  // Abrir
  await user.click(screen.getByRole("button", { name: /abrir menú/i }));

  // Icono de 'X'
  expect(
    container.querySelector('path[d="M6 18L18 6M6 6l12 12"]')
  ).toBeTruthy();
});

test("el botón de Instagram existe dentro del modal cuando se abre", async () => {
  const user = userEvent.setup();
  renderHeader();

  const nav = screen.getByRole("navigation");
  await user.click(within(nav).getByRole("button", { name: /contacto/i }));

  expect(await screen.findByTestId("ig-icon")).toBeInTheDocument();
});

/**
 * NUEVOS TESTS: cubren closeAllMenus
 *  - Cerrar modal y menú móvil al hacer click en un link del menú móvil
 *  - Cerrar modal al hacer click en el logo (Link a "/")
 */

test("closeAllMenus: al hacer click en un link del menú móvil se cierran modal y menú", async () => {
  const user = userEvent.setup();
  renderHeader();

  // Abrir menú móvil (hamburguesa)
  await user.click(screen.getByRole("button", { name: /abrir menú/i }));

  // En el menú móvil hay otro botón "Contacto" (además del de escritorio)
  const mobileContactoBtn = screen.getAllByRole("button", { name: /contacto/i })[1];
  // Abrimos el modal desde el menú móvil y guardamos su contenedor
  const mobileMenuContainer = mobileContactoBtn.closest("div");
  await user.click(mobileContactoBtn);

  // Modal abierto
  expect(await screen.findByRole("dialog")).toBeInTheDocument();

  // Click en "Inicio" dentro del menú móvil debe cerrar todo (closeAllMenus)
  await user.click(within(mobileMenuContainer).getByRole("link", { name: /inicio/i }));

  // Modal cerrado
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

  // Menú móvil debe volver al icono hamburguesa (no 'X')
  const closeIcon = document.querySelector('path[d="M6 18L18 6M6 6l12 12"]');
  expect(closeIcon).toBeFalsy();
  const burgerIcon = document.querySelector('path[d="M4 6h16M4 12h16m-7 6h7"]');
  expect(burgerIcon).toBeTruthy();
});

test("closeAllMenus también se dispara al hacer click en el logo (navegación a /)", async () => {
  const user = userEvent.setup();
  renderHeader();

  // Abrimos el modal desde la nav de escritorio
  const nav = screen.getByRole("navigation");
  await user.click(within(nav).getByRole("button", { name: /contacto/i }));
  expect(await screen.findByRole("dialog")).toBeInTheDocument();

  // Click en el logo (Link a "/") debe ejecutar closeAllMenus (cierra modal y menú móvil)
  await user.click(screen.getByAltText(/logo uls/i));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});
