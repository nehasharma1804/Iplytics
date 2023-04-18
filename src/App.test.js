import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  test("renders header", () => {
    render(<App />);
    const headerElement = screen.getByTestId("header");
    expect(headerElement).toBeInTheDocument();
  });

  test("renders body", () => {
    render(<App />);
    const bodyElement = screen.getByTestId("body");
    expect(bodyElement).toBeInTheDocument();
  });

  test("renders App component", () => {
    render(<App />);
    const appElement = screen.getByTestId("app");
    expect(appElement).toBeInTheDocument();
  });
});