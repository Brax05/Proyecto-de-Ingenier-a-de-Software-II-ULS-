// src/test/unit/InstagramIcon.test.jsx
import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import InstagramIcon from "../../components/InstagramIcon";

describe("InstagramIcon", () => {
  test("renderiza un SVG con atributos base", () => {
    const { container } = render(<InstagramIcon />);
    const svg = container.querySelector("svg");

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("xmlns", "http://www.w3.org/2000/svg");
    expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
    expect(svg).toHaveAttribute("fill", "none");
    expect(svg).toHaveAttribute("stroke", "currentColor");
    expect(svg).toHaveAttribute("stroke-width", "2");
    expect(svg).toHaveAttribute("stroke-linecap", "round");
    expect(svg).toHaveAttribute("stroke-linejoin", "round");
  });

  test("incluye rect, path y line con atributos clave", () => {
    const { container } = render(<InstagramIcon />);
    const rect = container.querySelector("rect");
    const path = container.querySelector("path");
    const line = container.querySelector("line");

    expect(rect).toBeInTheDocument();
    expect(rect).toHaveAttribute("x", "2");
    expect(rect).toHaveAttribute("y", "2");
    expect(rect).toHaveAttribute("width", "20");
    expect(rect).toHaveAttribute("height", "20");
    expect(rect).toHaveAttribute("rx", "5");
    expect(rect).toHaveAttribute("ry", "5");

    expect(path).toBeInTheDocument();
    expect(path).toHaveAttribute("d"); 

    expect(line).toBeInTheDocument();
    expect(line).toHaveAttribute("x1", "17.5");
    expect(line).toHaveAttribute("y1", "6.5");
    expect(line).toHaveAttribute("x2", "17.51");
    expect(line).toHaveAttribute("y2", "6.5");
  });

  test("aplica la clase recibida por props al elemento svg", () => {
    const { container } = render(<InstagramIcon className="h-12 w-12 test-cls" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("h-12");
    expect(svg).toHaveClass("w-12");
    expect(svg).toHaveClass("test-cls");
  });
});
