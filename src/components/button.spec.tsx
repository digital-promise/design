import { render } from "@testing-library/react";
import { default as Button } from "./button";

describe("Button component specification", () => {
  it("renders", () => {
    const { getByTestId } = render(<Button data-testid="test" />);
    expect(getByTestId("test")).toBeTruthy();
  });
});
