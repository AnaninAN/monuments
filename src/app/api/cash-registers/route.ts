import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const cashRegisters = await prisma.cashRegister.findMany({
      include: {
        transactions: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 10,
        },
      },
    });

    return NextResponse.json(cashRegisters);
  } catch (error) {
    console.error('Error fetching cash registers:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { name, comment } = body;

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    const cashRegister = await prisma.cashRegister.create({
      data: {
        name,
        comment,
      },
    });

    return NextResponse.json(cashRegister);
  } catch (error) {
    console.error('Error creating cash register:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
