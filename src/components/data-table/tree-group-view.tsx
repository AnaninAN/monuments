'use client';

import { useState } from 'react';
import { ChevronRight, Minus, Pencil, Plus } from 'lucide-react';

import { cn } from '@/lib/utils';
import type {
  Action,
  ActionDel,
  GetGroupById,
  TreeNode,
} from '@/components/types/types';

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
import useConfirmationStore from '@/store/confirmation';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface TreeViewProps {
  data: TreeNode[];
  className?: string;
  getGroupById?: GetGroupById;
  action: Action;
  actionDel: ActionDel;
}

export function TreeGroupView({
  data,
  className,
  getGroupById,
  action,
  actionDel,
}: TreeViewProps) {
  const [selectedId, setSelectedId] = useState<number>(1);
  const { openConfirmation } = useConfirmationStore();
  const router = useRouter();

  const delClick = () => {
    openConfirmation({
      title: `Удалить группу ${
        data.find((item) => item.id === selectedId)?.name
      }?`,
      description: '',
      cancelLabel: 'Отмена',
      actionLabel: 'Удалить',
      onAction: () => {
        console.log('delClick', selectedId);
        actionDel(selectedId)
          .then((data) => {
            if (data?.error) {
              toast.error(data.error);
            }
            if (data?.success) {
              router.refresh();
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
    const isSelected = selectedId === node.id;

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
              setSelectedId(node.id);
            }}
          >
            {hasChildren && (
              <ChevronRight className="h-4 w-4 mr-2 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-data-[state=closed]/collapsible:rotate-0" />
            )}
            {node.id === 1 ? (
              <span>{`${node.name} [${node.countAll}]`}</span>
            ) : (
              <span>{`${node.name} [${node.count}]`}</span>
            )}
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
      <div className="pb-4 flex gap-2 justify-start pt-[68px]">
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
              parent={data.find((item) => item.id === selectedId)}
              getGroupById={getGroupById}
              action={action}
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
              parent={data.find((item) => item.id === selectedId)}
              getGroupById={getGroupById}
              action={action}
              id={selectedId}
            />
          </DialogContent>
        </Dialog>
        <Button variant="outline" onClick={delClick} type="button">
          <Minus className="text-red-500" />
        </Button>
      </div>
      <div className="border mr-2">{tree.map((node) => renderNode(node))}</div>
    </div>
  );
}
