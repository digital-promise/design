import type { Meta, StoryObj } from "@storybook/react-vite";

import Table, { type TableColumn } from "./table";

type TableStoryRow = {
  id: string;
  tenantOrgName: string;
  achievements: string;
  awards: string;
  status: "Active" | "Deactivated";
  actions: string;
};

type TableStoryProps = {
  rows: TableStoryRow[];
};

const columns: TableColumn<TableStoryRow>[] = [
  {
    key: "tenantOrgName",
    header: "Tenant Org Name",
    render: (row) => row.tenantOrgName,
  },
  {
    key: "achievements",
    header: "Achievements",
    render: (row) => row.achievements,
  },
  {
    key: "awards",
    header: "Awards",
    render: (row) => row.awards,
  },
  {
    key: "status",
    header: "Status",
    render: (row) => row.status,
  },
  {
    key: "actions",
    header: "Actions",
    render: (row) => row.actions,
  },
];

function StoryTable({ rows }: TableStoryProps) {
  return <Table columns={columns} rows={rows} rowKey={(row) => row.id} />;
}

const meta = {
  title: "Table",
  component: StoryTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    rows: [
      {
        id: "tenant-1",
        tenantOrgName: "Acme District",
        achievements: "2 / 5",
        awards: "1 / 5",
        status: "Active",
        actions: "...",
      },
      {
        id: "tenant-2",
        tenantOrgName: "Northstar Academy",
        achievements: "5 / 5",
        awards: "6 / 5",
        status: "Deactivated",
        actions: "...",
      },
    ],
  },
  decorators: [
    (Story) => (
      <section className="w-[1200px] max-w-full">
        <Story />
      </section>
    ),
  ],
} satisfies Meta<typeof StoryTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
