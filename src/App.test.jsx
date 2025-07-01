import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("App", () => {
  let squares;

  beforeEach(() => {
    render(<App />);
    squares = screen.getAllByLabelText(/Empty/i);
  });

  it("renders correctly", () => {
    expect(screen.getByText(/Next Player: X/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Reset/i })).toBeInTheDocument();

    expect(squares.length).toBe(9);
  });

  it("places an X correctly on first click", () => {
    fireEvent.click(squares[0]);

    expect(squares[0]).toHaveTextContent(/X/);
    expect(squares[0]).toHaveAccessibleName(/X/);
    expect(screen.getByText(/Next Player: O/i)).toBeInTheDocument();
  });

  it("correctly identifies player X win", () => {
    [0, 3, 1, 4, 2].forEach((index) => {
      fireEvent.click(squares[index]);
    });

    expect(screen.getByText(/Winner: X/i)).toBeInTheDocument();

    fireEvent.click(squares[5]);

    expect(screen.getByText(/Winner: X/i)).toBeInTheDocument();
  });
});
