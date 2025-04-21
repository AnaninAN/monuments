import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const monumentTypes = await prisma.monumentType.findMany({
      include: {
        monuments: true,
      },
    });
    return NextResponse.json(monumentTypes);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch monument types' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const monumentType = await prisma.monumentType.create({
      data: {
        name: body.name,
        description: body.description,
      },
    });
    return NextResponse.json(monumentType);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create monument type' },
      { status: 500 }
    );
  }
}
