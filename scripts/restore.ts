import { PrismaClient } from '@/generated/prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

// Define the order of table restoration based on dependencies
const restoreOrder = [
  'WarehouseGroup',
  'Warehouse',
  'Unit',
  'CounterpartyType',
  'Counterparty',
  'MaterialGroup',
  'Material',
  'Product',
  'Detail',
  'Service',
  'ProductMaterial',
  'ProductDetail',
  'ProductService',
  'DetailMaterial',
  'DetailService',
  'MaterialMovement',
  'StockMovement',
  'Order',
  'OrderItem',
  'Payment',
  'ProductionOrder',
  'ProductionOperation',
  'WorkCenter',
  'Tool',
  'OperationMaterial',
  'OperationTool',
  'QualityCheck',
  'Document',
  'Batch',
  'SerialNumber',
  'StockAlert',
  'Notification',
  'NotificationPreference',
  'ServiceTask',
];

async function restoreDatabase(backupFile: string) {
  try {
    // Read backup file
    const backupData = JSON.parse(fs.readFileSync(backupFile, 'utf-8'));

    // Create default warehouse group if it doesn't exist in backup
    if (!backupData.WarehouseGroup || !backupData.WarehouseGroup.length) {
      console.log('Creating default warehouse group...');
      try {
        await prisma.warehouseGroup.create({
          data: {
            id: 1,
            name: 'Default Group',
            parentId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        });
        console.log('Default warehouse group created successfully');
      } catch (error) {
        console.error('Error creating default warehouse group:', error);
        throw error;
      }
    }

    // Restore data for each table in the defined order
    for (const tableName of restoreOrder) {
      const records = backupData[tableName];
      if (Array.isArray(records) && records.length > 0) {
        console.log(`Restoring ${records.length} records to ${tableName}...`);

        // Use transaction to ensure all records are restored or none
        await prisma.$transaction(async (tx) => {
          // Convert PascalCase to camelCase for Prisma model names
          const modelName =
            tableName.charAt(0).toLowerCase() + tableName.slice(1);
          // @ts-expect-error - Dynamic table access
          const model = tx[modelName];
          if (model) {
            for (const record of records) {
              try {
                await model.create({
                  data: record,
                });
              } catch (error) {
                console.error(`Error creating record in ${tableName}:`, error);
                throw error; // Re-throw to trigger transaction rollback
              }
            }
          } else {
            console.warn(`Model ${tableName} not found in Prisma client`);
          }
        });
      } else {
        console.log(`No records to restore for ${tableName}`);
      }
    }

    console.log('Database restored successfully');
  } catch (error) {
    console.error('Error restoring backup:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Get the most recent backup file
const backupDir = path.join(process.cwd(), 'backups');
const backupFiles = fs
  .readdirSync(backupDir)
  .filter((file) => file.startsWith('backup-') && file.endsWith('.json'))
  .sort()
  .reverse();

if (backupFiles.length > 0) {
  const latestBackup = path.join(backupDir, backupFiles[0]);
  restoreDatabase(latestBackup);
} else {
  console.error('No backup files found');
  process.exit(1);
}
