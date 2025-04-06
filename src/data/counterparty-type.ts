'use server';

import { CounterpartyType } from '@prisma/client';

import { db } from '@/lib/db';

export const getCounterpartyTypeById = async (
  id?: number
): Promise<CounterpartyType | null> => {
  try {
    const counterpartyType = await db.counterpartyType.findUnique({
      where: { id },
    });

    return counterpartyType;
  } catch {
    return null;
  }
};

export const getCounterpartyTypeByName = async (
  name: string
): Promise<CounterpartyType | null> => {
  try {
    const counterpartyType = await db.counterpartyType.findUnique({
      where: { name },
    });

    return counterpartyType;
  } catch {
    return null;
  }
};

export const getAllCounterpartyTypes = async (): Promise<
  CounterpartyType[] | []
> => {
  try {
    const counterpartyTypes = await db.counterpartyType.findMany();

    return counterpartyTypes;
  } catch {
    return [];
  }
};
