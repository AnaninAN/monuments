import { NextResponse } from 'next/server';

import { getAllWarehouses } from '@/data/warehouse';

export async function GET() {
  const warehouses = await getAllWarehouses();

  return NextResponse.json(warehouses);
}
