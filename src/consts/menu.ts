import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { LucideProps } from 'lucide-react';

import { Role } from '@prisma/client';

export type MenuType = {
  title: string;
  url: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  roles: Role[];
};

enum MenuTitle {
  EMPLOYEES = 'EMPLOYEES',
  WAREHOUSES = 'WAREHOUSES',
  COUNTERPARTY_TYPES = 'COUNTERPARTY_TYPES',
  COUNTERPARTIES = 'COUNTERPARTIES',
  UNITS = 'UNITS',
  PROCUREMENTS = 'PROCUREMENTS',
  PRODUCTS = 'PRODUCTS',
  RETAIL = 'RETAIL',
}

export const menu: Record<MenuTitle, MenuType> = {
  [MenuTitle.EMPLOYEES]: {
    title: 'Сотрудники',
    url: '/references/employees',
    roles: ['ADMIN'],
  },
  [MenuTitle.WAREHOUSES]: {
    title: 'Склады',
    url: '/references/warehouses',
    roles: ['ADMIN'],
  },
  [MenuTitle.COUNTERPARTY_TYPES]: {
    title: 'Кат. контрагентов',
    url: '/references/counterparty-types',
    roles: ['ADMIN'],
  },
  [MenuTitle.COUNTERPARTIES]: {
    title: 'Контрагенты',
    url: '/references/counterparties',
    roles: ['ADMIN'],
  },
  [MenuTitle.UNITS]: {
    title: 'Ед. измерения',
    url: '/references/units',
    roles: ['ADMIN'],
  },
  [MenuTitle.PROCUREMENTS]: {
    title: 'Закупки',
    url: '/supply/procurements',
    roles: ['ADMIN', 'OPERATOR'],
  },
  [MenuTitle.PRODUCTS]: {
    title: 'Товары',
    url: '/warehouse/products',
    roles: ['ADMIN', 'OPERATOR'],
  },
  [MenuTitle.RETAIL]: {
    title: 'Розн. продажи',
    url: '/sell/retail',
    roles: ['ADMIN', 'OPERATOR'],
  },
} as const;
