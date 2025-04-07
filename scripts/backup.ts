import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function backupDatabase() {
  try {
    console.log('Starting database backup...');

    // Create backup directory if it doesn't exist
    const backupDir = path.join(process.cwd(), 'backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Get current timestamp for backup filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(backupDir, `backup-${timestamp}.json`);

    console.log('Fetching data from database...');

    // Backup all tables
    const backupData = {
      Material: await prisma.material.findMany(),
      MaterialGroup: await prisma.materialGroup.findMany(),
      Unit: await prisma.unit.findMany(),
      Warehouse: await prisma.warehouse.findMany(),
      Detail: await prisma.detail.findMany(),
      Product: await prisma.product.findMany(),
      Service: await prisma.service.findMany(),
      Order: await prisma.order.findMany(),
      Counterparty: await prisma.counterparty.findMany(),
      User: await prisma.user.findMany(),
      // Add other tables as needed
    };

    console.log('Writing backup to file...');

    // Write backup to file
    fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2));
    console.log(`Backup created successfully: ${backupFile}`);
  } catch (error) {
    console.error('Error creating backup:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      console.error('Stack trace:', error.stack);
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the backup
backupDatabase().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
