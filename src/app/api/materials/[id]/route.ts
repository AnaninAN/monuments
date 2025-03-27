import { NextResponse } from 'next/server';

import { getMaterialById } from '@/data/material';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = Number((await params).id);

  const material = await getMaterialById(id);

  return NextResponse.json(material);
}
