import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Spinner from "../components/Spinner";

test("renders Spinner component correctly", () => {
  const { container } = render(<Spinner />);
  expect(container.firstChild).toMatchSnapshot();
});
