import { NextResponse } from 'next/server';

import { getWarehouseById } from '@/data/warehouse';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = Number((await params).id);

  const user = await getWarehouseById(id);

  return NextResponse.json(user);
}
