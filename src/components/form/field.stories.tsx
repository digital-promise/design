import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field } from "./field";

const meta: Meta = {
  title: "Form Field",
  component: Field,
  tags: ["autodocs"],
  args: {
    name: "achievement-name",
    label: "Achievement Name",
    error: false,
    required: true,
  },
};

type Story = StoryObj<typeof meta>;

export const Normal: Story = {};

export const WithError: Story = {
    args: {
        errorMessage: "Achievement name field is required."
    }
}

export default meta;
