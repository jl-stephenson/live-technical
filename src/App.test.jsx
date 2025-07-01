import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("App", () => {
  let squares;

  beforeEach(() => {
    render(<App />);
    squares = screen.getAllByRole("button", { name: /Empty/i });
  });

  it("renders correctly", () => {
    expect(screen.getByText(/Next Player: X/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Reset/i })).toBeInTheDocument();
    expect(squares).toHaveLength(9);
  });

  it("places an X correctly on first click", () => {
    fireEvent.click(squares[0]);

    expect(squares[0]).toHaveTextContent(/X/);
    expect(squares[0]).toHaveAccessibleName(/X/);
    expect(screen.getByText(/Next Player: O/i)).toBeInTheDocument();
  });

  it("doesn't change player mark if square clicked twice", () => {
    fireEvent.click(squares[0]);

    expect(squares[0]).toHaveTextContent(/X/);
    expect(squares[0]).toBeDisabled();

    fireEvent.click(squares[0]);

    expect(squares[0]).toHaveTextContent(/X/);
  });

  it("correctly handles player X win", () => {
    const xWinSequence = [0, 3, 1, 4, 2];

    xWinSequence.forEach((index) => {
      fireEvent.click(squares[index]);
    });

    expect(screen.getByText(/Winner: X/i)).toBeInTheDocument();

    fireEvent.click(squares[5]);

    expect(squares[5]).toHaveAccessibleName(/Empty/i);
    expect(screen.getByText(/Winner: X/i)).toBeInTheDocument();

    squares.forEach((square) => {
      expect(square).toBeDisabled();
    });
  });

  it("correctly handles draw", () => {
    const drawSequence = [0, 1, 2, 3, 5, 4, 6, 8, 7];

    drawSequence.forEach((index) => {
      fireEvent.click(squares[index]);
    });

    expect(screen.getByText(/Game Over/i)).toBeInTheDocument();

    squares.forEach((square) => {
      expect(square).toBeDisabled();
    });
  });

  it("correctly resets the board", () => {
    const resetButton = screen.getByRole("button", { name: /Reset/i });

    [0, 1, 2].forEach((index) => {
      fireEvent.click(squares[index]);
    });

    fireEvent.click(resetButton);

    expect(screen.getAllByRole("button", { name: /Empty/i })).toHaveLength(9);
  });
});
