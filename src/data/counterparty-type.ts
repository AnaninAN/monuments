import { db } from '@/lib/db';

export const getCounterpartyTypeById = async (id: number) => {
  try {
    const counterpartyType = await db.counterpartyType.findUnique({
      where: { id },
    });

    return counterpartyType;
  } catch {
    return null;
  }
};

export const getCounterpartyTypeByName = async (name: string) => {
  try {
    const counterpartyType = await db.counterpartyType.findUnique({
      where: { name },
    });

    return counterpartyType;
  } catch {
    return null;
  }
};

export const getAllCounterpartyTypes = async () => {
  try {
    const counterpartyTypes = await db.counterpartyType.findMany();

    return counterpartyTypes;
  } catch {
    return null;
  }
};
