import { z } from 'zod';

export const MaterialFormSchema = z.object({
  image: z.string().optional(),
  name: z.string().min(1, 'Пустое значение не допустимо!'),
  article: z.string(),
  priceIn: z.coerce.number(),
  minBalance: z.coerce.number(),
  comment: z.string(),
  materialGroupId: z.number(),
  materialGroup: z.object({
    name: z.string(),
  }),
  unitId: z.number(),
  unit: z.object({
    name: z.string(),
  }),
  warehouseId: z.number(),
  warehouse: z.object({
    name: z.string(),
  }),
});

export type TMaterialFormData = z.infer<typeof MaterialFormSchema>;

export type KeyTMaterialFormData =
  | keyof Omit<
      TMaterialFormData,
      | 'materialGroupId'
      | 'materialGroup'
      | 'unitId'
      | 'unit'
      | 'warehouseId'
      | 'warehouse'
    >
  | 'materialGroup_name'
  | 'unit_name'
  | 'warehouse_name'
  | 'id';
