'use client';

import { useState } from 'react';
import { ChevronRight, Plus } from 'lucide-react';

import { cn } from '@/lib/utils';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import type { TreeNode } from '@/components/types/types';
import type { Action, GetGroupById } from '@/components/data-table/three-table';
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

interface TreeViewProps {
  data: TreeNode[];
  className?: string;
  getGroupById?: GetGroupById;
  action?: Action;
  onGroupSelect?: (groupId: number | null) => void;
}

export function TreeGroupView({
  data,
  className,
  getGroupById,
  action,
  onGroupSelect,
}: TreeViewProps) {
  const [selectedId, setSelectedId] = useState<number | null>(1);

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
              isSelected &&
                'bg-white text-blue-700 hover:text-white hover:bg-blue-700'
            )}
            onClick={() => {
              setSelectedId(node.id);
              onGroupSelect?.(node.id);
            }}
          >
            {hasChildren && (
              <ChevronRight className="h-4 w-4 mr-2 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-data-[state=closed]/collapsible:rotate-0" />
            )}
            <span>{node.name}</span>
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
      <div className="pb-4 flex justify-start pt-[68px]">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Добавить группу</DialogTitle>
              <DialogDescription />
            </DialogHeader>
            <GroupForm getGroupById={getGroupById} action={action} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="border mr-2">{tree.map((node) => renderNode(node))}</div>
    </div>
  );
}
