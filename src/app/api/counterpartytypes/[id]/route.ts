import { NextResponse } from 'next/server';

import { getCounterpartyTypeById } from '@/data/counterparty-type';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = Number((await params).id);

  const counterpartyType = await getCounterpartyTypeById(id);

  return NextResponse.json(counterpartyType);
}
