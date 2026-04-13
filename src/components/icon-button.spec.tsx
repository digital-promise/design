import { render, screen } from "@testing-library/react";
import { default as IconButton } from "./icon-button";
import { IconLink } from "./icon-button";

describe("IconButton component specification", () => {
  it("renders an icon-only button", () => {
    render(<IconButton icon="ThreeDots" label="Open actions menu" />);

    expect(
      screen.getByRole("button", { name: "Open actions menu" }),
    ).toBeTruthy();
  });

  it("renders the secondary text variant", () => {
    render(
      <IconButton
        icon="Plus"
        label="Create Tenant"
        variant="secondary"
      >
        Create Tenant
      </IconButton>,
    );

    const button = screen.getByRole("button", { name: "Create Tenant" });

    expect(button.className).toContain("btn");
    expect(button.className).toContain("btn-primary");
    expect(screen.getByText("Create Tenant")).toBeTruthy();
  });

  it("renders the tertiary text variant", () => {
    render(
      <IconButton
        icon="Question"
        label="Help"
        variant="tertiary"
      >
        Help
      </IconButton>,
    );

    const text = screen.getByText("Help");

    expect(text.className).toContain("font-semibold");
    expect(text.className).toContain("underline");
  });

  it("renders the xs icon-only variant", () => {
    const { container } = render(
      <IconButton icon="Close" label="Close dialog" size="xs" />,
    );

    expect(container.querySelector("button")?.className).toContain("h-6");
    expect(container.querySelector("svg")?.getAttribute("class")).toContain(
      "h-5",
    );
  });

  it("renders the link variant", () => {
    render(
      <IconLink href="/tenants/create" icon="Plus" label="Create Tenant" variant="secondary">
        Create Tenant
      </IconLink>,
    );

    expect(screen.getByRole("link", { name: "Create Tenant" })).toBeTruthy();
  });
});
