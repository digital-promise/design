import type { ReactNode } from "react";

export type TableColumn<TRow> = {
  key: string;
  header: string;
  headerClassName?: string;
  cellClassName?: string;
  render: (row: TRow) => ReactNode;
};

type TableProps<TRow> = {
  columns: TableColumn<TRow>[];
  rows: TRow[];
  rowKey: (row: TRow, index: number) => string;
};

export default function Table<TRow>({ columns, rows, rowKey }: TableProps<TRow>) {
  return (
    <table className="w-full table-auto border-y border-gray-2 text-gray-5">
      <thead className="font-bold">
        <tr>
          {columns.map((column) => (
            <td
              key={column.key}
              className={`px-3 py-4 ${column.headerClassName ?? ""}`.trim()}
            >
              {column.header}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowKey(row, rowIndex)} className="border-t border-gray-2">
            {columns.map((column) => (
              <td
                key={column.key}
                className={`${column.cellClassName ?? "px-3 py-4"}`.trim()}
              >
                {column.render(row)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
