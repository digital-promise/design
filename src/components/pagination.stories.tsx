import type { Meta, StoryObj } from "@storybook/react-vite";

import Pagination from "./pagination";

const meta = {
  title: "Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    count: 64,
    limit: 8,
  },
  decorators: [
    (Story) => (
      <section className="w-[680px] max-w-full px-6">
        <Story />
      </section>
    ),
  ],
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
