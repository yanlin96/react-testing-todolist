import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../../components/Header";

const setup = () => {
  const fn = jest.fn();
  const utils = render(<Header addUndoItem={fn} />);
  const input = utils.getByTestId("header-input");
  return {
    input,
    ...utils,
  };
};

test("Header should contain a input field", () => {
  render(<Header />);
  expect(screen.getByTestId("header-input")).toBeInTheDocument();
});

test("The initial input value should be null ", () => {
  const { input } = setup();
  expect(input.value).toBe("");
});

test("The input element should be changed while the change event triggered", () => {
  const { input } = setup();
  fireEvent.change(input, { target: { value: "learn TDD" } });
  expect(input.value).toBe("learn TDD");
});

test("When type 'enter' button on keyboard, if there is no content, nothing changed", () => {
  const fn = jest.fn();
  const utils = render(<Header addUndoItem={fn} />);
  const input = utils.getByTestId("header-input");
  fireEvent.change(input, { target: { value: "" } });
  fireEvent.keyUp(input, { key: "Enter", code: "Enter", keyCode: "13" });
  expect(fn).not.toHaveBeenCalled();
});

test("When type 'enter' button on keyboard, if there is content, changed", () => {
  const fn = jest.fn();
  const utils = render(<Header addUndoItem={fn} />);
  const input = utils.getByTestId("header-input");
  fireEvent.change(input, { target: { value: "learn TDD" } });
  fireEvent.keyUp(input, { key: "Enter", code: "Enter", keyCode: "13" });
  expect(fn).toHaveBeenCalled();
  expect(fn).toHaveBeenLastCalledWith("learn TDD");
});
