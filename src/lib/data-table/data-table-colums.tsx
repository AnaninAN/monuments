import { ColumnDef } from '@tanstack/react-table';

import { DataSheet } from '@/components/data-table/data-sheet';
import { CellStatus } from '@/components/data-table/cell-status';
import { RowActions } from '@/components/data-table/row-actions';

import { dataTableColumnHeader } from './data-table-column-header';

export type ColumnsType<K> = { key: K; sort: boolean }[];

export function dataTableColumns<T, K extends string>(
  key: K,
  columns: ColumnsType<K>,
  translateColumns: Record<K, string>,
  actionDel?: (id: number) => Promise<{ success?: string; error?: string }>,
  FormComponent?: React.ComponentType<{
    id?: number;
  }>
): ColumnDef<T>[] {
  const renderColumns = () => {
    const col: ColumnDef<T>[] = [];
    columns.map(({ key, sort }) => {
      if (key !== 'status') {
        col.push({
          accessorKey: key,
          header: ({ column }) =>
            dataTableColumnHeader<T, K>(column, translateColumns, sort),
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

  return [
    {
      accessorKey: key,
      header: ({ column }) =>
        dataTableColumnHeader<T, K>(column, translateColumns, true),
      cell: ({ row }) => (
        <div className="pl-3">
          <DataSheet
            id={row.getValue(key)}
            trigger={row.getValue(key)}
            className="bg-white p-1 text-blue-700 rounded-md hover:text-white hover:bg-blue-700 cursor-pointer"
            FormComponent={FormComponent}
          />
        </div>
      ),
    },
    ...renderColumns(),
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <RowActions
            id={row.getValue(key) as number}
            name={row.getValue('name')}
            actionDel={actionDel}
          />
        );
      },
    },
  ];
}
