import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  default as IconButton,
  iconButtonSizes,
  iconButtonStates,
  iconButtonVariants,
} from "./icon-button";

const meta = {
  title: "Icon Button",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story, { args }) => (
      <section
        className={
          args.variant === "tertiary" || args.state !== "inverse"
            ? undefined
            : "bg-indigo-3 px-6 py-3"
        }
      >
        <Story />
      </section>
    ),
  ],
  argTypes: {
    size: {
      options: iconButtonSizes,
      control: { type: "radio" },
    },
    state: {
      options: iconButtonStates,
      control: { type: "radio" },
    },
    variant: {
      options: iconButtonVariants,
      control: { type: "radio" },
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Ghost: Story = {
  args: {
    icon: "ThreeDots",
    label: "Open actions menu",
    variant: "ghost",
    size: "md",
    state: "default",
  },
};

export const Outline: Story = {
  args: {
    icon: "ThreeDots",
    label: "Open actions menu",
    variant: "outline",
    size: "md",
    state: "default",
  },
};

export const Secondary: Story = {
  args: {
    icon: "Plus",
    label: "Create Tenant",
    variant: "secondary",
    children: "Create Tenant",
  },
};

export const Tertiary: Story = {
  args: {
    icon: "Question",
    label: "Help",
    variant: "tertiary",
    children: "Help",
  },
};
