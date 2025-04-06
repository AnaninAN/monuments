import { ColumnDef } from '@tanstack/react-table';

import { DataSheet } from '@/components/data-table/data-sheet';
import { CellStatus } from '@/components/data-table/cell-status';
import { RowActions } from '@/components/data-table/row-actions';

import { dataTableColumnHeader } from '@/lib/data-table/data-table-column-header';
import { translateColumnsAction } from '@/lib/data-table/translate-colums-header';

export type ColumnsType<K> = { key: K; sort: boolean }[];

const renderColumns = <T extends Record<string, unknown>, K extends string>(
  columns: ColumnsType<K>,
  translateColumns: Record<K, string>
): ColumnDef<T>[] => {
  const col: ColumnDef<T>[] = [];
  columns.forEach(({ key, sort }) => {
    if (key !== 'status') {
      col.push({
        accessorKey: key.replace('_', '.'),
        header: ({ column }) =>
          dataTableColumnHeader<T, K>(column, translateColumns, sort),
        cell: ({ row }) => {
          return row.getValue(key) === undefined ? '-' : row.getValue(key);
        },
      });
    } else {
      col.push({
        accessorKey: key,
        header: ({ column }) =>
          dataTableColumnHeader<T, K>(column, translateColumns),
        cell: ({ row }) => <CellStatus value={row.getValue(key)} />,
      });
    }
  });
  return col;
};

export function dataTableColumns<
  T extends Record<string, unknown>,
  K extends string,
>(
  key: K,
  columns: ColumnsType<K>,
  translateColumns: Record<K, string>,
  actionDel?: (id: number) => Promise<{ success?: string; error?: string }>,
  FormComponent?: React.ComponentType<{ id?: number }>
): ColumnDef<T>[] {
  return [
    {
      accessorKey: key,
      header: ({ column }) =>
        dataTableColumnHeader<T, K>(column, translateColumns, true),
      cell: ({ row }) => (
        <div className="pl-3">
          <DataSheet
            id={row.getValue(key)}
            trigger={String(row.getValue(key))}
            FormComponent={FormComponent}
            className="bg-white p-1 text-blue-700 rounded-md hover:text-white hover:bg-blue-700 cursor-pointer"
          />
        </div>
      ),
    },
    ...renderColumns<T, K>(columns, translateColumns),
    {
      id: 'actions',
      header: ({ column }) =>
        dataTableColumnHeader<T, K>(column, translateColumnsAction),
      cell: ({ row }) => (
        <RowActions
          id={row.getValue(key)}
          name={row.getValue('name')}
          actionDel={actionDel}
        />
      ),
    },
  ];
}
