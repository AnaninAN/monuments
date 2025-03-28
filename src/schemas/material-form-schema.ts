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
    name: z.string().min(1, 'Необходимо выбрать группу!'),
  }),
  unitId: z.number(),
  unit: z.object({
    name: z.string().min(1, 'Необходимо выбрать ед. измерения!'),
  }),
  warehouseId: z.number().optional(),
  warehouse: z.object({
    name: z.string().optional(),
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
