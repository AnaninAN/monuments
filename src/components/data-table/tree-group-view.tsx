'use client';

import { ChevronRight, Minus, Pencil, Plus } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import type { TreeNode } from '@/types/types';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { GroupForm } from '@/components/data-table/forms/group-form';
import { Spin } from '@/components/ui/spin';

import useConfirmationStore from '@/store/confirmation';
import { useDataTableStore } from '@/store/data-table';
import { Entity } from '@/types/types';
import { delEntityGroupAction } from '@/actions/entity-group';

interface TreeViewProps {
  data: TreeNode[];
  className?: string;
  isLoadingDataGroup?: boolean;
  entity: Entity;
}

export function TreeGroupView({
  data,
  className,
  isLoadingDataGroup,
  entity,
}: TreeViewProps) {
  const { openConfirmation } = useConfirmationStore();

  const {
    selectedIdGroup,
    setSelectedIdGroup,
    setCountGroup,
    setSelectedNameGroup,
  } = useDataTableStore();

  const delClick = () => {
    openConfirmation({
      title: `Удалить группу ${
        data.find((item) => item.id === selectedIdGroup)?.name
      }?`,
      description: '',
      cancelLabel: 'Отмена',
      actionLabel: 'Удалить',
      onAction: () => {
        delEntityGroupAction(entity, selectedIdGroup)
          .then((data) => {
            if (data?.error) {
              toast.error(data.error);
            }
            if (data?.success) {
              setCountGroup(data.count ?? 0);
              toast.success(data.success);
            }
          })
          .catch(() => toast.error('Что-то пошло не так!'));
      },
      onCancel: () => {},
    });
  };

  const buildTree = (
    items: TreeNode[],
    parentId: number | null = null
  ): TreeNode[] => {
    return items
      .filter(
        (item) =>
          item.parentId === parentId ||
          (parentId === null && item.parentId === 0)
      )
      .map((item) => ({
        ...item,
        children: buildTree(items, item.id),
      }));
  };

  const renderNode = (node: TreeNode) => {
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = selectedIdGroup === node.id;

    return (
      <div key={node.id}>
        <Collapsible className="group/collapsible">
          <CollapsibleTrigger
            className={cn(
              'flex items-center w-full p-2 hover:bg-accent rounded-md transition-colors',
              'cursor-pointer pl-[10px]',
              isSelected && 'bg-white text-blue-700 font-semibold'
            )}
            onClick={() => {
              setSelectedIdGroup(node.id);
              setSelectedNameGroup(node.name);
            }}
          >
            {hasChildren && (
              <ChevronRight className="h-4 w-4 mr-2 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-data-[state=closed]/collapsible:rotate-0" />
            )}
            <span>{`${node.name}`}</span>
          </CollapsibleTrigger>
          {hasChildren && (
            <CollapsibleContent className="pl-4">
              {node.children?.map((child) => renderNode(child))}
            </CollapsibleContent>
          )}
        </Collapsible>
      </div>
    );
  };

  const tree = buildTree(data);

  return (
    <div className={cn('w-full', className)}>
      <div className="pb-4 flex gap-2 justify-start pt-[68px] relative">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Добавить группу</DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <GroupForm
              entity={entity}
              parent={data.find((item) => item.id === selectedIdGroup)}
            />
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Pencil />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Изменить группу</DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <GroupForm
              entity={entity}
              parent={data.find((item) => item.id === selectedIdGroup)}
              id={selectedIdGroup}
            />
          </DialogContent>
        </Dialog>
        <Button variant="outline" onClick={delClick} type="button">
          <Minus className="text-red-500" />
        </Button>
      </div>
      <div className="border mr-2 relative min-h-[43px]">
        {isLoadingDataGroup && (
          <div className="w-full h-full bg-gray-100/50 absolute top-0 left-0">
            <Spin />
          </div>
        )}
        {tree.map((node) => renderNode(node))}
      </div>
    </div>
  );
}
