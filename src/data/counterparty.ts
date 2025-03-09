import { db } from '@/lib/db';

export const getCounterpartyById = async (id: number) => {
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

export const getCounterpartyByName = async (name: string) => {
  try {
    const counterparty = await db.counterparty.findUnique({
      where: { name },
    });

    return counterparty;
  } catch {
    return null;
  }
};

export const getAllCounterparties = async () => {
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
    return null;
  }
};
