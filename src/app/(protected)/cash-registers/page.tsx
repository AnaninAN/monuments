import { CashRegistersTable } from '@/components/cash-registers/cash-registers-table';
import { CreateCashRegisterDialog } from '@/components/cash-registers/create-cash-register-dialog';

export default async function CashRegistersPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Cash Registers</h1>
        <CreateCashRegisterDialog />
      </div>
      <CashRegistersTable />
    </div>
  );
}
