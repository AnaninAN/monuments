'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTable } from '@/components/data-table/data-table';
import { TDataTable, TThree } from '@/types/types';
import { TreeGroupView } from '@/components/data-table/tree-group-view';

interface ThreeTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  dataTable: TDataTable<TData>;
  three?: TThree;
}

export function ThreeTable<TData, TValue>({
  columns,
  dataTable,
  three,
}: ThreeTableProps<TData, TValue>) {
  return (
    <div>
      <h1 className="font-semibold self-center flex mb-4">{dataTable.title}</h1>
      <div className="flex">
        {three && (
          <TreeGroupView
            data={three.threeData}
            className="w-1/6"
            isLoadingDataGroup={three.isLoadingDataGroup}
            entity={three.entity}
          />
        )}
        <DataTable
          columns={columns}
          data={dataTable.data}
          FormComponent={dataTable.FormComponent}
          filter={dataTable.filter}
          translateColumns={dataTable.translateColumns}
          isLoadingDataTable={dataTable.isLoadingDataTable}
        />
      </div>
    </div>
  );
}
