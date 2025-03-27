import { NextResponse } from 'next/server';

import { getMaterialGroupById } from '@/data/material-group';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = Number((await params).id);

  const materialGroup = await getMaterialGroupById(id);

  return NextResponse.json(materialGroup);
}
