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

    const transactions = await prisma.cashTransaction.findMany({
      include: {
        cashRegister: true,
        order: true,
        payment: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(transactions);
  } catch (error) {
    console.error('Error fetching cash transactions:', error);
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
    const { amount, type, description, cashRegisterId, orderId, paymentId } =
      body;

    if (!amount || !type || !cashRegisterId) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Update cash register balance
    const cashRegister = await prisma.cashRegister.findUnique({
      where: { id: cashRegisterId },
    });

    if (!cashRegister) {
      return new NextResponse('Cash register not found', { status: 404 });
    }

    const newBalance = cashRegister.balance + amount;

    // Create transaction and update balance in a transaction
    const [transaction] = await prisma.$transaction([
      prisma.cashTransaction.create({
        data: {
          amount,
          type,
          description,
          cashRegisterId,
          orderId,
          paymentId,
        },
      }),
      prisma.cashRegister.update({
        where: { id: cashRegisterId },
        data: { balance: newBalance },
      }),
    ]);

    return NextResponse.json(transaction);
  } catch (error) {
    console.error('Error creating cash transaction:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
