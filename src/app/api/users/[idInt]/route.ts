import { NextResponse } from 'next/server';

import { getUserByIdInt } from '@/data/user';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ idInt: string }> }
) {
  const idInt = Number((await params).idInt);

  const user = await getUserByIdInt(idInt);

  return NextResponse.json(user);
}
