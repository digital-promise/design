import type { ReactNode } from "react";
import { useId } from "react";

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
  const tableId = useId();

  return (
    <table className="w-full table-auto border-y border-gray-2 text-gray-5">
      <thead className="font-bold">
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              id={`${tableId}-col-${column.key}`}
              scope="col"
              //chnaged from leading 5, 1px gets magically added
              className={`px-3 py-4 text-left leading-[23px] ${column.headerClassName ?? ""}`.trim()}
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowKey(row, rowIndex)} className="border-t border-gray-2">
            {columns.map((column) => (
              <td
                key={column.key}
                headers={`${tableId}-col-${column.key}`}
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
