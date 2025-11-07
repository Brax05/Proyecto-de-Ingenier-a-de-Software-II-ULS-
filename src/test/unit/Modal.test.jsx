// src/test/unit/Modal.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Modal from "../../components/Modal";

// Mock de framer-motion para simplificar (sin animaciones reales)
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...rest }) => <div {...rest}>{children}</div>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

describe("Modal", () => {
  test("no renderiza cuando isOpen=false; renderiza cuando true; y desmonta al volver a false", () => {
    const { rerender } = render(
      <Modal isOpen={false} onClose={() => {}}>
        <p>Contenido</p>
      </Modal>
    );
    expect(screen.queryByText(/contenido/i)).not.toBeInTheDocument();

    rerender(
      <Modal isOpen={true} onClose={() => {}}>
        <p>Contenido</p>
      </Modal>
    );
    expect(screen.getByText(/contenido/i)).toBeInTheDocument();

    rerender(
      <Modal isOpen={false} onClose={() => {}}>
        <p>Contenido</p>
      </Modal>
    );
    expect(screen.queryByText(/contenido/i)).not.toBeInTheDocument();
  });

  test("onClose se llama al hacer click en '×' y en el backdrop; NO desde el contenido interno", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Modal isOpen={true} onClose={onClose}>
        <p>Hola Modal</p>
      </Modal>
    );

    const closeBtn = screen.getByRole("button", { name: /×/ });
    // El botón está dentro del contenedor interno; su padre es el modal, y el padre de ese padre es el backdrop
    const inner = closeBtn.parentElement; // modal interno
    const backdrop = inner.parentElement; // capa oscura

    // Click en contenido interno NO debe cerrar
    await user.click(inner);
    expect(onClose).toHaveBeenCalledTimes(0);

    // Click en botón × SÍ cierra
    await user.click(closeBtn);
    expect(onClose).toHaveBeenCalledTimes(1);

    // Click en backdrop SÍ cierra
    await user.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  test("smoke test: los props de animación llegan al DOM (initial/animate/exit)", () => {
    render(
      <Modal isOpen={true} onClose={() => {}}>
        <p>Animación</p>
      </Modal>
    );

    const closeBtn = screen.getByRole("button", { name: /×/ });
    const inner = closeBtn.parentElement;   // motion.div interno
    const backdrop = inner.parentElement;   // motion.div de fondo

    // El backdrop usa initial="hidden" animate="visible"
    expect(backdrop).toHaveAttribute("initial", "hidden");
    expect(backdrop).toHaveAttribute("animate", "visible");

    // El modal interno usa initial="hidden" animate="visible" exit="exit"
    expect(inner).toHaveAttribute("initial", "hidden");
    expect(inner).toHaveAttribute("animate", "visible");
    expect(inner).toHaveAttribute("exit", "exit");
  });
});
