'use client';

import { useState } from 'react';
import {
  Search,
  Plus,
  CircleDot,
  Menu,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function MaterialsManagement() {
  const [expandedCategories, setExpandedCategories] = useState<
    Record<string, boolean>
  >({
    Материалы: true,
    'Букеты закуп': false,
    Кромочный: false,
    Листовой: false,
    Фурнитура: false,
  });

  const toggleCategory = (category: string) => {
    setExpandedCategories({
      ...expandedCategories,
      [category]: !expandedCategories[category],
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="border-b px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-medium">Материалы</h1>
          <button className="flex items-center text-gray-500 text-sm">
            <span className="mr-1">Справка</span>
          </button>
        </div>
        <div className="text-right text-sm">
          <div>Ананьин Андрей 26.01.2025 13:33</div>
          <div className="text-orange-500">Изменение Материалы №33 ...</div>
        </div>
      </header>

      {/* Search and filters */}
      <div className="px-4 py-3 flex justify-between items-center">
        <div className="relative w-full max-w-xl">
          <Input
            placeholder="Поиск ..."
            className="pl-3 pr-10 py-2 border rounded-md w-full"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
        <Button
          variant="outline"
          className="ml-2 border-orange-500 text-orange-500 flex items-center gap-2"
        >
          <Menu className="h-4 w-4" />
          <span>Фильтры</span>
        </Button>
      </div>

      {/* Action buttons */}
      <div className="px-4 py-2 flex justify-between items-center">
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full h-10 w-10 border-orange-500 text-orange-500"
          >
            <Plus className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="rounded-full h-10 w-10 border-orange-500 text-orange-500"
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="rounded-full h-10 w-10 border-orange-500 text-orange-500"
          >
            <CircleDot className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            size="icon"
            variant="outline"
            className="rounded-full h-10 w-10 border-orange-500 text-orange-500"
          >
            <CircleDot className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="rounded-full h-10 w-10 border-orange-500 text-orange-500"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            className="border-orange-500 text-orange-500 flex items-center gap-2 px-4"
          >
            <MoreHorizontal className="h-5 w-5" />
            <span>Действия</span>
          </Button>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2">
          <Plus className="h-5 w-5" />
          <span>Добавить</span>
        </Button>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 border-r overflow-y-auto">
          <div className="p-2">
            <div className="mb-1">
              <button
                className="flex items-center w-full text-left p-2 hover:bg-gray-100 rounded"
                onClick={() => toggleCategory('Материалы')}
              >
                {expandedCategories['Материалы'] ? (
                  <ChevronDown className="h-4 w-4 mr-2 text-gray-500" />
                ) : (
                  <ChevronRight className="h-4 w-4 mr-2 text-gray-500" />
                )}
                <span className="font-medium">Материалы [33]</span>
              </button>

              {expandedCategories['Материалы'] && (
                <div className="ml-4 mt-1">
                  <div className="p-2 hover:bg-gray-100 rounded">
                    Букеты закуп [1]
                  </div>
                  <div className="p-2 hover:bg-gray-100 rounded">
                    Кромочный [0]
                  </div>
                  <div className="p-2 hover:bg-gray-100 rounded">
                    Листовой [10]
                  </div>
                  <div className="p-2 hover:bg-gray-100 rounded">
                    Фурнитура [22]
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left">
                <th className="px-4 py-3 font-medium text-gray-500 w-12">№</th>
                <th className="px-4 py-3 font-medium text-gray-500 w-24">
                  Изображение
                </th>
                <th className="px-4 py-3 font-medium text-gray-500">
                  Наименование
                </th>
                <th className="px-4 py-3 font-medium text-gray-500">Артикул</th>
                <th className="px-4 py-3 font-medium text-gray-500">Тип</th>
                <th className="px-4 py-3 font-medium text-gray-500">
                  Категория товара
                </th>
                <th className="px-4 py-3 font-medium text-gray-500">Серия</th>
                <th className="px-4 py-3 font-medium text-gray-500">Проект</th>
                <th className="px-4 py-3 font-medium text-gray-500 text-right">
                  Стоимость
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-orange-500">33</td>
                <td className="px-4 py-3">
                  <div className="w-12 h-12 bg-gray-100 flex items-center justify-center border">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                </td>
                <td className="px-4 py-3">Букет 50</td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3 text-right">50,00 ₽</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-orange-500">32</td>
                <td className="px-4 py-3">
                  <div className="w-12 h-12 bg-gray-100 flex items-center justify-center border">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                </td>
                <td className="px-4 py-3">шкант 8*30</td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3 text-right">10,00 ₽</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-orange-500">31</td>
                <td className="px-4 py-3">
                  <div className="w-12 h-12 bg-gray-100 flex items-center justify-center border">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                </td>
                <td className="px-4 py-3">уголок сталь 4 отв</td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3 text-right">10,00 ₽</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-orange-500">30</td>
                <td className="px-4 py-3">
                  <div className="w-12 h-12 bg-gray-100 flex items-center justify-center border">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                </td>
                <td className="px-4 py-3">стяжка рафикс</td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3 text-right">10,00 ₽</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-orange-500">29</td>
                <td className="px-4 py-3">
                  <div className="w-12 h-12 bg-gray-100 flex items-center justify-center border">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                </td>
                <td className="px-4 py-3">саморез 3,5*30</td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3 text-right">10,00 ₽</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-orange-500">28</td>
                <td className="px-4 py-3">
                  <div className="w-12 h-12 bg-gray-100 flex items-center justify-center border">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                </td>
                <td className="px-4 py-3">саморез 3,5*16</td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3"></td>
                <td className="px-4 py-3 text-right">10,00 ₽</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
