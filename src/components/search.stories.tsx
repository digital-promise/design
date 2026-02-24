import type { Meta, StoryObj } from "@storybook/react-vite";

import Search from "./search";

const meta = {
  title: "Search",
  component: Search,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    placeholder: "Search in 8 Tenants",
    inputWidth: 380,
    syncToUrl: false,
  },
  decorators: [
    (Story) => (
      <section className="w-[380px] max-w-full">
        <Story />
      </section>
    ),
  ],
} satisfies Meta<typeof Search>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
