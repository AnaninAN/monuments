import { NextResponse } from 'next/server';

import { getCounterpartyById } from '@/data/counterparty';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = Number((await params).id);

  const counterparty = await getCounterpartyById(id);

  return NextResponse.json(counterparty);
}
