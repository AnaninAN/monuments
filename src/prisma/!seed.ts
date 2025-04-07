import { db } from '../lib/db';

async function up() {}

async function down() {
  await db.$executeRaw`SET FOREIGN_KEY_CHECKS=0`;

  await db.$executeRaw`TRUNCATE TABLE User`;
  await db.$executeRaw`TRUNCATE TABLE MaterialGroup`;
  await db.$executeRaw`TRUNCATE TABLE WarehouseGroup`;
  await db.$executeRaw`TRUNCATE TABLE Material`;
  await db.$executeRaw`TRUNCATE TABLE Warehouse`;
  await db.$executeRaw`TRUNCATE TABLE Detail`;
  await db.$executeRaw`TRUNCATE TABLE Product`;
  await db.$executeRaw`TRUNCATE TABLE Service`;
  // await db.$executeRaw`TRUNCATE TABLE Order`;
  await db.$executeRaw`TRUNCATE TABLE Counterparty`;
  await db.$executeRaw`TRUNCATE TABLE Unit`;
  // await db.$executeRaw`TRUNCATE TABLE OrderItem`;
  // await db.$executeRaw`TRUNCATE TABLE OrderService`;
  // await db.$executeRaw`TRUNCATE TABLE OrderDetail`;
  // await db.$executeRaw`TRUNCATE TABLE OrderMaterial`;
  // await db.$executeRaw`TRUNCATE TABLE OrderMaterialGroup`;

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
