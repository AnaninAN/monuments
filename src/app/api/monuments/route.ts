import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const monuments = await prisma.monument.findMany({
      include: {
        monumentType: true,
        materials: {
          include: {
            material: true,
          },
        },
        parts: {
          include: {
            part: true,
          },
        },
      },
    });
    return NextResponse.json(monuments);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch monuments' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const monument = await prisma.monument.create({
      data: {
        name: body.name,
        description: body.description,
        dimensions: body.dimensions,
        basePrice: body.basePrice,
        monumentTypeId: body.monumentTypeId,
        materials: {
          create: body.materials?.map((material: any) => ({
            materialId: material.materialId,
            quantity: material.quantity,
            price: material.price,
          })),
        },
        parts: {
          create: body.parts?.map((part: any) => ({
            partId: part.partId,
            quantity: part.quantity,
            price: part.price,
          })),
        },
      },
      include: {
        monumentType: true,
        materials: {
          include: {
            material: true,
          },
        },
        parts: {
          include: {
            part: true,
          },
        },
      },
    });
    return NextResponse.json(monument);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create monument' },
      { status: 500 }
    );
  }
}
