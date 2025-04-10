'use server';

import { Counterparty } from '@prisma/client';

import { db } from '@/lib/db';
import { CounterpartyWithAdd } from '@/types/types';
import { TCounterparty } from '@/schemas/counterparty-form-schema';

export const getCounterpartyByIdData = async (
  id?: number
): Promise<CounterpartyWithAdd | null> => {
  try {
    const counterparty = await db.$transaction(async (tx) => {
      return tx.counterparty.findUnique({
        where: { id },
        include: {
          counterpartyType: {
            select: {
              name: true,
            },
          },
        },
      });
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
    const counterparty = await db.$transaction(async (tx) => {
      return tx.counterparty.findUnique({
        where: { name },
      });
    });

    return counterparty;
  } catch {
    return null;
  }
};

export const getAllCounterpartiesData = async (): Promise<
  CounterpartyWithAdd[] | []
> => {
  try {
    const counterparties = await db.$transaction(async (tx) => {
      return tx.counterparty.findMany({
        include: {
          counterpartyType: {
            select: {
              name: true,
            },
          },
        },
      });
    });

    return counterparties;
  } catch {
    return [];
  }
};

export const addCounterpartyData = async (
  data: TCounterparty
): Promise<number | null> => {
  try {
    const result = await db.$transaction(async (tx) => {
      await tx.counterparty.create({
        data: { ...data },
      });
      return tx.counterparty.count();
    });

    return result;
  } catch {
    return null;
  }
};

export const updateCounterpartyData = async (
  id: number,
  data: TCounterparty
): Promise<number | null> => {
  try {
    await db.$transaction(async (tx) => {
      await tx.counterparty.update({
        where: { id },
        data: { ...data },
      });
    });

    return 0;
  } catch {
    return null;
  }
};

export const delCounterpartyData = async (
  id: number
): Promise<number | null> => {
  try {
    const result = await db.$transaction(async (tx) => {
      await tx.counterparty.delete({
        where: { id },
      });
      return tx.counterparty.count();
    });

    return result;
  } catch {
    return null;
  }
};
