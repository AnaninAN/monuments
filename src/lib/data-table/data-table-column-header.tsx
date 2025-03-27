import { Column } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';

export function dataTableColumnHeader<T, K extends string>(
  column: Column<T>,
  translateColumns: Record<K, string>,
  sort?: boolean
) {
  return (
    <DataTableColumnHeader
      column={column}
      title={translateColumns[column.id as K]}
      sort={sort}
    />
  );
}
