import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("App", () => {
  it("renders correctly", () => {
    render(<App />);

    expect(screen.getByText("Next Player: X")).toBeInTheDocument();
    expect(screen.getByRole("button", {name: /Reset/})).toBeInTheDocument();

    const squares = screen.getAllByLabelText(/Empty/);
    expect(squares.length).toBe(9);
  });
});
