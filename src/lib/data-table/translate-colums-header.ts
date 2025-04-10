import { KeyTCounterpartyFormData } from '@/schemas/counterparty-form-schema';
import { KeyTCounterpartyTypeFormData } from '@/schemas/counterparty-type-form-schema';
import { KeyTMaterialFormData } from '@/schemas/material-form-schema';
import { KeyTUnitFormData } from '@/schemas/unit-form-schema';
import { KeyTUserFormData } from '@/schemas/user-form-schema';
import { KeyTWarehouseFormData } from '@/schemas/warehouse-form-schema';

export const translateColumnsUser: Record<KeyTUserFormData, string> = {
  idInt: '№',
  name: 'Имя',
  lastname: 'Фамилия',
  email: 'Email',
  role: 'Роль',
  phoneNumber: 'Номер телефона',
  status: 'Статус',
};

export const translateColumnsWarehouse: Record<KeyTWarehouseFormData, string> =
  {
    id: '№',
    name: 'Наименование',
    shortName: 'Краткое наименование',
    warehouseGroup_name: 'Группа',
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

export const translateColumnsCounterparty: Record<
  KeyTCounterpartyFormData,
  string
> = {
  id: '№',
  name: 'Наименование',
  counterpartyType_name: 'Категория',
  comment: 'Коментарий',
  status: 'Статус',
  email: 'Email',
  legalAddress: 'Юридический адрес',
  phone: 'Телефон',
  INN: 'ИНН',
  KPP: 'КПП',
  OGRN: 'ОГРН',
};

export const translateColumnsUnit: Record<KeyTUnitFormData, string> = {
  id: '№',
  name: 'Наименование',
  status: 'Статус',
  comment: 'Коментарий',
};

export const translateColumnsMaterial: Record<KeyTMaterialFormData, string> = {
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

export const translateColumnsAction: Record<string, string> = {
  actions: 'Действия',
};

export const translateColumnsLogin: Record<string, string> = {
  email: 'Email',
  password: 'Пароль',
};

export const translateColumnsGroup: Record<string, string> = {
  parentId: 'Родительская группа',
  name: 'Наименование',
};
