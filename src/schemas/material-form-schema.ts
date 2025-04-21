import { z } from 'zod';

export const MaterialFormSchema = z.object({
  image: z.string().optional(),
  name: z
    .string()
    .min(1, 'Пустое значение не допустимо!')
    .max(50, 'Наименование не должно превышать 50 символов!')
    .trim(),
  article: z.string().optional(),
  priceIn: z.coerce.number().optional(),
  priceOut: z.coerce.number().optional(),
  minBalance: z.coerce.number().optional(),
  count: z.coerce.number(),
  comment: z
    .string()
    .max(100, 'Комментарий не должен превышать 100 символов!')
    .trim(),
  materialGroupId: z.number(),
  materialGroup: z.object({
    name: z.string().min(1, 'Необходимо выбрать группу!'),
  }),
  unitId: z.number(),
  unit: z.object({
    name: z.string().min(1, 'Необходимо выбрать ед. измерения!'),
  }),
  warehouseId: z.number().nullable(),
  warehouse: z
    .object({
      name: z.string(),
    })
    .nullable(),
  weight: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
  width: z.coerce.number().optional(),
  length: z.coerce.number().optional(),
  volume: z.coerce.number().optional(),
});

export type TMaterialFormData = z.infer<typeof MaterialFormSchema>;

export type TMaterial = Omit<
  TMaterialFormData,
  'materialGroup' | 'unit' | 'warehouse'
>;

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
