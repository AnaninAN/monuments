import {
  BaggageClaim,
  Banknote,
  Caravan,
  ChartBarStacked,
  HandCoins,
  Handshake,
  NotebookTabs,
  Ruler,
  ShoppingCart,
  Users,
  Warehouse,
} from 'lucide-react';

import { menu, MenuType } from './menu';

interface NavMain extends MenuType {
  items: MenuType[];
}

export const navMain: NavMain[] = [
  {
    title: 'Снабжение',
    url: '#',
    icon: Caravan,
    roles: [],
    items: [
      {
        title: menu['PROCUREMENTS'].title,
        url: menu['PROCUREMENTS'].url,
        icon: BaggageClaim,
        roles: menu['PROCUREMENTS'].roles,
      },
    ],
  },
  {
    title: 'Склад',
    url: '#',
    icon: Warehouse,
    roles: [],
    items: [
      {
        title: menu['PRODUCTS'].title,
        url: menu['PRODUCTS'].url,
        icon: ShoppingCart,
        roles: menu['PRODUCTS'].roles,
      },
    ],
  },
  {
    title: 'Продажи',
    url: '#',
    icon: HandCoins,
    roles: [],
    items: [
      {
        title: menu['RETAIL'].title,
        url: menu['RETAIL'].url,
        icon: Banknote,
        roles: menu['RETAIL'].roles,
      },
    ],
  },
  {
    title: 'Справочники',
    url: '#',
    icon: NotebookTabs,
    roles: [],
    items: [
      {
        title: menu['EMPLOYEES'].title,
        url: menu['EMPLOYEES'].url,
        icon: Users,
        roles: menu['EMPLOYEES'].roles,
      },
      {
        title: menu['WAREHOUSES'].title,
        url: menu['WAREHOUSES'].url,
        icon: Warehouse,
        roles: menu['WAREHOUSES'].roles,
      },
      {
        title: menu['COUNTERPARTY_TYPES'].title,
        url: menu['COUNTERPARTY_TYPES'].url,
        icon: ChartBarStacked,
        roles: menu['COUNTERPARTY_TYPES'].roles,
      },
      {
        title: menu['COUNTERPARTIES'].title,
        url: menu['COUNTERPARTIES'].url,
        icon: Handshake,
        roles: menu['COUNTERPARTIES'].roles,
      },
      {
        title: menu['UNITS'].title,
        url: menu['UNITS'].url,
        icon: Ruler,
        roles: menu['UNITS'].roles,
      },
    ],
  },
];
