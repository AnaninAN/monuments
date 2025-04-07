'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTable } from '@/components/data-table/data-table';
import { TThree } from '@/components/types/types';
import { TreeGroupView } from '@/components/data-table/tree-group-view';

interface ThreeTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  FormComponent: React.ComponentType;
  title: string;
  filter: string;
  translateColumns: Record<string, string>;
  three?: TThree;
}

export function ThreeTable<TData, TValue>({
  columns,
  data,
  FormComponent,
  title,
  filter,
  translateColumns,
  three,
}: ThreeTableProps<TData, TValue>) {
  return (
    <div>
      <h1 className="font-semibold self-center flex mb-4">{title}</h1>
      <div className="flex">
        {three && (
          <TreeGroupView
            data={three.threeData}
            getGroupById={three.getGroupById}
            action={three.action}
            actionDel={three.actionDel}
            className="w-1/6"
          />
        )}
        <DataTable
          columns={columns}
          data={data}
          FormComponent={FormComponent}
          filter={filter}
          translateColumns={translateColumns}
        />
      </div>
    </div>
  );
}
