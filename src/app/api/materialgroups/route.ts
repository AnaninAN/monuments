import { NextResponse } from 'next/server';

import { getAllMaterialGroups } from '@/data/material-group';

export async function GET() {
  const materialGroups = await getAllMaterialGroups();

  return NextResponse.json(materialGroups);
}
