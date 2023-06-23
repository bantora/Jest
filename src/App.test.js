import { render, screen, fireEvent } from "@testing-library/react";
import App, { stringManipulation } from "./App";

test("button initial color", () => {
  // const { container } =
  render(<App />);

  const colorButton = screen.getByRole("button", {
    name: "Change to MidnightBlue",
  });

  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });

  fireEvent.click(colorButton);

  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });

  expect(colorButton).toHaveTextContent("Change to MediumVioletRed");
});

test("initial conditions", () => {
  render(<App />);

  const colorButton = screen.getByRole("button", {
    name: "Change to MidnightBlue",
  });
  expect(colorButton).toBeEnabled();

  const checkbox = screen.getByRole("checkbox");

  expect(checkbox).not.toBeChecked();
});

test("code quiz 1", () => {
  render(<App />);

  const button = screen.getByRole("button");
  const checkbox = screen.getByRole("checkbox");

  fireEvent.click(checkbox);
  expect(button).toBeDisabled();
  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
});

test("code quiz 2", () => {
  render(<App />);

  const button = screen.getByRole("button");
  const checkbox = screen.getByRole("checkbox");

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "gray" });
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "MediumVioletRed" });
  fireEvent.click(button);
  expect(button).toHaveStyle({ backgroundColor: "MidnightBlue" });
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "gray" });
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "MidnightBlue" });
});

describe("spaces before camel-case capital letters", () => {
  test("Works for no inner capital letters", () => {
    expect(stringManipulation("Red")).toBe("Red");
  });
  test("Works for one inner capital letters", () => {
    expect(stringManipulation("MidnightBlue")).toBe("Midnight Blue");
  });
  test("Works for multiple inner capital letters", () => {
    expect(stringManipulation("MidnightVioletRed")).toBe("Midnight Violet Red");
  });
});
