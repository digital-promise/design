import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormField, TextInput, Textarea, SingleImageDropzone } from "./index";

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

export const WithDropzone: Story = {
  args: {
    label: "Profile Picture",
    Input: SingleImageDropzone,
    inputProps: { required: true },
  },
};

export default meta;
