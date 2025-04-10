'use server';

import { CounterpartyType } from '@prisma/client';

import { db } from '@/lib/db';
import { TCounterpartyType } from '@/schemas/counterparty-type-form-schema';

export const getCounterpartyTypeByIdData = async (
  id?: number
): Promise<CounterpartyType | null> => {
  try {
    const counterpartyType = await db.$transaction(async (tx) => {
      return tx.counterpartyType.findUnique({
        where: { id },
      });
    });

    return counterpartyType;
  } catch {
    return null;
  }
};

export const getCounterpartyTypeByNameData = async (
  name: string
): Promise<CounterpartyType | null> => {
  try {
    const counterpartyType = await db.$transaction(async (tx) => {
      return tx.counterpartyType.findUnique({
        where: { name },
      });
    });

    return counterpartyType;
  } catch {
    return null;
  }
};

export const getAllCounterpartyTypesData = async (): Promise<
  CounterpartyType[] | []
> => {
  try {
    const counterpartyTypes = await db.$transaction(async (tx) => {
      return tx.counterpartyType.findMany();
    });

    return counterpartyTypes;
  } catch {
    return [];
  }
};

export const addCounterpartyTypeData = async (
  data: TCounterpartyType
): Promise<number | null> => {
  try {
    const result = await db.$transaction(async (tx) => {
      await tx.counterpartyType.create({
        data,
      });
      return tx.counterpartyType.count();
    });

    return result;
  } catch {
    return null;
  }
};

export const updateCounterpartyTypeData = async (
  id: number,
  data: TCounterpartyType
): Promise<number | null> => {
  try {
    await db.$transaction(async (tx) => {
      await tx.counterpartyType.update({
        where: { id },
        data,
      });
    });

    return 0;
  } catch {
    return null;
  }
};

export const delCounterpartyTypeData = async (
  id: number
): Promise<number | null> => {
  try {
    const result = await db.$transaction(async (tx) => {
      await tx.counterpartyType.delete({
        where: { id },
      });
      return tx.counterpartyType.count();
    });

    return result;
  } catch {
    return null;
  }
};
