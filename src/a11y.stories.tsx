import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormField, TextInput } from "./components/forms";
import Button from "./components/button";

const meta = {
  title: "A11y/Keyboard Navigation",
} satisfies Meta;

type Story = StoryObj<typeof meta>;

export const Focus: Story = {
  render: () => (
    <form
      className="max-w-sm mx-auto flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <a
        className="kb-focus underline text-blue-4 font-medium"
        href="#"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        Need help? Contact Us.
      </a>
      <FormField
        label="Email address"
        Input={TextInput}
        inputProps={{
          type: "email",
        }}
      />
      <Button type="submit" className="md:self-start">Submit</Button>
    </form>
  ),
};

export default meta;
