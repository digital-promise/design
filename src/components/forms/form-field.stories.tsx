import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormField, TextInput, Textarea, Select, SingleImageDropzone } from "./index";

const meta = {
  title: "Forms/Form Field",
  component: FormField,
  decorators: (Story) => (
    <form className="max-w-2xl">
      <Story />
    </form>
  ),
} satisfies Meta<typeof FormField>;

type Story = StoryObj<typeof meta>;

export const WithTextInput: Story = {
  args: {
    label: "Name",
    Input: TextInput,
    inputProps: { required: true },
  },
};

export const WithTextArea: Story = {
  args: {
    label: "Description",
    Input: Textarea,
    inputProps: { required: true },
  },
};

export const WithSelect: Story = {
  args: {
    label: "Choose a plan",
    Input: Select,
    inputProps: {
      name: "tier",
      required: true,
      options: ["Starter", "Pro", "Enterprise"].map(o => ({label: o, value: o.toLowerCase()}))
    }
  }
}

export const WithDropzone: Story = {
  args: {
    label: "Profile Picture",
    Input: SingleImageDropzone,
    inputProps: {
      name: "image",
      required: true,
      instructions:
        "Please upload a .png file (recommended 420×420 pixels or larger) or an .svg file.",
    },
  },
};

export default meta;
