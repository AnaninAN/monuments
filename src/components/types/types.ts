import { TGroupFormData } from '@/schemas/group-form-schema';

export type TreeNode = {
  id: number;
  name: string;
  parentId: number | 0;
  count: number;
  countAll: number;
  children?: TreeNode[];
};

export type GetGroupById = (id?: number) => Promise<TGroupFormData | null>;

export type Action = (
  values: TGroupFormData,
  id?: number
) => Promise<{ error?: string; success?: string }>;

export type ActionDel = (
  id: number
) => Promise<{ error?: string; success?: string }>;

export type TThree = {
  threeData: TreeNode[];
  getGroupById: GetGroupById;
  action: Action;
  actionDel: ActionDel;
};
