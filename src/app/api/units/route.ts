import { NextResponse } from 'next/server';

import { getAllUnits } from '@/data/unit';

export async function GET() {
  const units = await getAllUnits();

  return NextResponse.json(units);
}
