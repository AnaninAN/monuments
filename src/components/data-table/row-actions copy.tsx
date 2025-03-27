import { MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface RowActionsProps {
  id: number;
  actionDel: (id: number) => Promise<{ success?: string; error?: string }>;
  name: string;
}

export const RowActions = ({ id, actionDel, name }: RowActionsProps) => {
  const router = useRouter();

  const handleClick = () => {
    actionDel(id)
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
  };

  return (
    <AlertDialog>
      <div className="flex justify-end pr-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <AlertDialogTrigger>Удалить</AlertDialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Вы действительно хотите удалить {name}?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick}>Удалить</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
