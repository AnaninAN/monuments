import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

import useConfirmationStore from '@/store/confirmation';

type RowActionsProps = {
  id: number;
  actionDel?: (id: number) => Promise<{ success?: string; error?: string }>;
  name: string;
};

export const RowActions = ({ id, name, actionDel }: RowActionsProps) => {
  const { openConfirmation } = useConfirmationStore();
  const router = useRouter();

  const delClick = () => {
    openConfirmation({
      title: `Вы действительно хотите удалить ${name}?`,
      description: '',
      cancelLabel: 'Отмена',
      actionLabel: 'Удалить',
      onAction: () => {
        actionDel!(id)
          .then((data) => {
            if (data?.error) {
              toast.error(data.error);
            }
            if (data?.success) {
              router.refresh();
              toast.success(data.success);
            }
          })
          .catch(() => toast.error('Что-то пошло не так!'));
      },
      onCancel: () => {},
    });
  };

  if (actionDel) {
    return (
      <div className="flex justify-end pr-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={delClick}>Удалить</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return null;
};
