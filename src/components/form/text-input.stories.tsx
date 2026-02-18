import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextInput } from "./text-input";

const meta: Meta = {
  title: "Text Input",
  component: TextInput,
  tags: ["autodocs"],
};

type Story = StoryObj<typeof meta>;

export const Normal: Story = {};

export default meta;
