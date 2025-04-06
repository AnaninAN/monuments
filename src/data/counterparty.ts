'use server';

import { Counterparty } from '@prisma/client';

import { db } from '@/lib/db';
import { CounterpartyWithAdd } from './dto/counterparty';

export const getCounterpartyById = async (
  id?: number
): Promise<CounterpartyWithAdd | null> => {
  try {
    const counterparty = await db.counterparty.findUnique({
      where: { id },
      include: {
        counterpartyType: {
          select: {
            name: true,
          },
        },
      },
    });

    return counterparty;
  } catch {
    return null;
  }
};

export const getCounterpartyByName = async (
  name: string
): Promise<Counterparty | null> => {
  try {
    const counterparty = await db.counterparty.findUnique({
      where: { name },
    });

    return counterparty;
  } catch {
    return null;
  }
};

export const getAllCounterparties = async (): Promise<
  CounterpartyWithAdd[] | []
> => {
  try {
    const counterparties = await db.counterparty.findMany({
      include: {
        counterpartyType: {
          select: {
            name: true,
          },
        },
      },
    });

    return counterparties;
  } catch {
    return [];
  }
};
