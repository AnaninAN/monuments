import { NextResponse } from 'next/server';

import { getAllCounterpartyTypes } from '@/data/counterparty-type';

export async function GET() {
  const counterpartyTypes = await getAllCounterpartyTypes();

  return NextResponse.json(counterpartyTypes);
}
