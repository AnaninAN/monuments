import { hashSync } from 'bcryptjs';

import { db } from '../lib/db';

async function up() {
  await db.user.createMany({
    data: [
      {
        idInt: 1,
        email: 'test_admin@monuments.ru',
        password: hashSync('11111111', 10),
        role: 'ADMIN',
        emailVerified: new Date(),
        isTwoFactorEnabled: false,
        name: 'Тест',
        lastname: 'Админ',
        phoneNumber: '+7 (921) 111-22-28',
      },
      {
        idInt: 2,
        email: 'test_operator@monuments.ru',
        password: hashSync('22222222', 10),
        role: 'OPERATOR',
        emailVerified: new Date(),
        isTwoFactorEnabled: false,
        name: 'Тест',
        lastname: 'Оператор',
        phoneNumber: '+7 (911) 377-55-28',
      },
    ],
  });
  // await db.counterpartyType.createMany({
  //   data: [{ name: 'Поставщик' }, { name: 'Розничный клиент' }],
  // });
  // await db.counterparty.createMany({
  //   data: [
  //     {
  //       name: 'ООО "Техноснаб"',
  //       counterpartyTypeId: 1,
  //     },
  //     {
  //       name: 'Иванов И.И.',
  //       counterpartyTypeId: 2,
  //     },
  //   ],
  // });
}

async function down() {
  await db.$executeRaw`SET FOREIGN_KEY_CHECKS=0`;

  await db.$executeRaw`TRUNCATE TABLE User`;
  // await db.$executeRaw`TRUNCATE TABLE CounterpartyType`;
  // await db.$executeRaw`TRUNCATE TABLE Counterparty`;

  await db.$executeRaw`SET FOREIGN_KEY_CHECKS=1`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.log(e);
  }
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
