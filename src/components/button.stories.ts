import type { Meta, StoryObj } from "@storybook/react-vite";

import { default as Button, variants, states } from "./button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  args: {
    variant: "primary",
    state: "default",
    disabled: false,
  },
  argTypes: {
    variant: {
      options: variants,
      control: { type: "radio" },
    },
    state: {
      options: states,
      control: { type: "radio" },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    children: "Primary Button",
    variant: "primary",
  },
  parameters: {
    controls: { exclude: ["variant"] },
  },
};
