export const unit = [
  {
    name: 'шт',
  },
  {
    name: 'кг',
  },
  {
    name: 'литр',
  },
  {
    name: 'пм',
  },
  {
    name: 'м2',
  },
  {
    name: 'м3',
  },
  {
    name: 'лист',
  },
];

export const counterpartyType = [
  { name: 'Оптовый клиент' },
  { name: 'Розничный клиент' },
  { name: 'Дилер' },
  { name: 'Поставщик' },
];

export const warehous = [
  { name: 'Склад готовой продукции', shortName: 'СГП' },
  { name: 'Склад сырья', shortName: 'СС' },
  { name: 'Склад производства', shortName: 'СП' },
  { name: 'Склад инструментов', shortName: 'СИ' },
];

export const materialGroup = {
  name: 'Материалы',
  parentGroup: 0,
};

export const material = [
  {
    name: 'Букет 80',
    unitId: 1,
    materialGroupId: 2,
    priceIn: 80,
    warehousId: 1,
    minBalance: 10,
  },
  {
    name: 'Букет 100',
    materialGroupId: 2,
    unitId: 1,
    priceIn: 100,
    warehousId: 1,
    minBalance: 10,
  },
  {
    name: 'Фанера 8мм',
    materialGroupId: 5,
    unitId: 7,
    priceIn: 1500,
    warehousId: 2,
    minBalance: 5,
  },
];
