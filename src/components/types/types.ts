export interface TreeNode {
  id: number;
  name: string;
  parentId: number | null;
  children?: TreeNode[];
}
