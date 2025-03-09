import { NextResponse } from 'next/server';

import { getUserById } from '@/data/user';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = Number((await params).id);

  const user = await getUserById(id);

  return NextResponse.json(user);
}
