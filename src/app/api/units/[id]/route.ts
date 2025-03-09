import { NextResponse } from 'next/server';

import { getUnitById } from '@/data/unit';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = Number((await params).id);

  const unit = await getUnitById(id);

  return NextResponse.json(unit);
}
