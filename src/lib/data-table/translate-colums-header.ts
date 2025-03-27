import { KeyTCounterpartyFormData } from '@/schemas/counterparty-form-schema';
import { KeyTCounterpartyTypeFormData } from '@/schemas/counterparty-type-form-schema';
import { KeyTMaterialFormData } from '@/schemas/material-form-schema';
import { KeyTUnitFormData } from '@/schemas/unit-form-schema';
import { KeyTUserFormData } from '@/schemas/user-form-schema';
import { KeyTWarehouseFormData } from '@/schemas/warehouse-form-schema';

export const translateColumnsEmployees: Record<KeyTUserFormData, string> = {
  idInt: '№',
  name: 'Имя',
  lastname: 'Фамилия',
  email: 'Email',
  role: 'Роль',
  phoneNumber: 'Номер телефона',
  status: 'Статус',
};

export const translateColumnsWarehouses: Record<KeyTWarehouseFormData, string> =
  {
    id: '№',
    name: 'Наименование',
    shortName: 'Краткое наименование',
    comment: 'Комментарий',
    status: 'Статус',
  };

export const translateColumnsCounterpartyType: Record<
  KeyTCounterpartyTypeFormData,
  string
> = {
  id: '№',
  name: 'Наименование',
  comment: 'Комментарий',
  status: 'Статус',
};

export const translateColumnsCounterparties: Record<
  KeyTCounterpartyFormData,
  string
> = {
  id: '№',
  name: 'Наименование',
  counterpartyType_name: 'Категория',
  comment: 'Коментарий',
  status: 'Статус',
};

export const translateColumnsUnits: Record<KeyTUnitFormData, string> = {
  id: '№',
  name: 'Наименование',
  status: 'Статус',
};

export const translateColumnsMaterials: Record<KeyTMaterialFormData, string> = {
  id: '№',
  name: 'Наименование',
  image: 'Изображение',
  article: 'Артикул',
  minBalance: 'Минимальный остаток',
  priceIn: 'Закупочная цена',
  materialGroup_name: 'Группа',
  unit_name: 'Единица измерения',
  warehouse_name: 'Склад хранения',
  comment: 'Коментарий',
};
