import { prisma } from '@/lib/prisma';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatCurrency } from '@/lib/utils';
import { CashTransactionDialog } from './cash-transaction-dialog';

export async function CashRegistersTable() {
  const cashRegisters = await prisma.cashRegister.findMany({
    include: {
      transactions: {
        orderBy: {
          createdAt: 'desc',
        },
        take: 10,
      },
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Transaction</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cashRegisters.map((register) => (
            <TableRow key={register.id}>
              <TableCell>{register.name}</TableCell>
              <TableCell>{formatCurrency(register.balance)}</TableCell>
              <TableCell>{register.status}</TableCell>
              <TableCell>
                {register.transactions[0] ? (
                  <div>
                    <div className="font-medium">
                      {formatCurrency(register.transactions[0].amount)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {register.transactions[0].type}
                    </div>
                  </div>
                ) : (
                  'No transactions'
                )}
              </TableCell>
              <TableCell>
                <CashTransactionDialog cashRegisterId={register.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
