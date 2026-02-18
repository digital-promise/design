import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "./label";

const meta: Meta = {
  title: "Input Label",
  component: Label,
  tags: ["autodocs"],
  args: {
    label: "Achievement Name",
    error: false,
    required: true,
  },
};

type Story = StoryObj<typeof meta>;

export const Normal: Story = {};

export default meta;
