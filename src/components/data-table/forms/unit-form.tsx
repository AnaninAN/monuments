'use client';

import { useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Status } from '@prisma/client';
import { toast } from 'sonner';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Api } from '@/services/api-client';
import { TUnitFormData, UnitFormSchema } from '@/schemas/unit-form-schema';
import { unit } from '@/actions/unit';
import { translateColumnsUnits } from '@/lib/data-table/translate-colums';
import { translateStatus } from '@/components/data-table/cell-status';

export const UnitForm = ({ id }: { id?: number }) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<TUnitFormData>({
    resolver: zodResolver(UnitFormSchema),
    defaultValues: {
      name: '',
      status: 'ACTIVE',
    },
  });

  useEffect(() => {
    if (id) {
      (async function () {
        const data = await Api.units.fetchUnitById(id);

        form.setValue('name', data.name);
        form.setValue('status', data.status);
      })();
    }
  }, [form, id]);

  const onSubmit = (values: TUnitFormData) => {
    startTransition(() => {
      unit(values, id)
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
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translateColumnsUnits[field.name]}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="" disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{translateColumnsUnits[field.name]}</FormLabel>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите статус" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={Status.ACTIVE}>
                      {translateStatus[Status.ACTIVE]}
                    </SelectItem>
                    <SelectItem value={Status.ARCHIVE}>
                      {translateStatus[Status.ARCHIVE]}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          Сохранить
        </Button>
      </form>
    </Form>
  );
};
