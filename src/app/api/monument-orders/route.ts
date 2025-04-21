import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const orders = await prisma.monumentOrder.findMany({
      include: {
        monument: {
          include: {
            monumentType: true,
          },
        },
        customer: true,
      },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch monument orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const order = await prisma.monumentOrder.create({
      data: {
        monumentId: body.monumentId,
        customerId: body.customerId,
        totalPrice: body.totalPrice,
        deposit: body.deposit,
        notes: body.notes,
      },
      include: {
        monument: {
          include: {
            monumentType: true,
          },
        },
        customer: true,
      },
    });
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create monument order' },
      { status: 500 }
    );
  }
}
