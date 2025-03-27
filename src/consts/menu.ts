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
  USERS = 'USERS',
  WAREHOUSES = 'WAREHOUSES',
  COUNTERPARTY_TYPES = 'COUNTERPARTY_TYPES',
  COUNTERPARTIES = 'COUNTERPARTIES',
  UNITS = 'UNITS',
  PROCUREMENTS = 'PROCUREMENTS',
  RESIDUE_ANALYSIS = 'RESIDUE_ANALYSIS',
  RETAIL = 'RETAIL',
  MATERIALS = 'MATERIALS',
  DETAILS = 'DETAILS',
  PRODUCTS = 'PRODUCTS',
}

export const menu: Record<MenuTitle, MenuType> = {
  [MenuTitle.MATERIALS]: {
    title: 'Материалы',
    url: '/references/materials',
    roles: ['ADMIN'],
  },
  [MenuTitle.DETAILS]: {
    title: 'Детали',
    url: '/references/details',
    roles: ['ADMIN'],
  },
  [MenuTitle.PRODUCTS]: {
    title: 'Изделия',
    url: '/references/products',
    roles: ['ADMIN'],
  },
  [MenuTitle.USERS]: {
    title: 'Пользователи',
    url: '/references/users',
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
  [MenuTitle.RESIDUE_ANALYSIS]: {
    title: 'Анализ остатков',
    url: '/warehouse/residue_analysis',
    roles: ['ADMIN', 'OPERATOR'],
  },
  [MenuTitle.RETAIL]: {
    title: 'Розн. продажи',
    url: '/sell/retail',
    roles: ['ADMIN', 'OPERATOR'],
  },
} as const;
