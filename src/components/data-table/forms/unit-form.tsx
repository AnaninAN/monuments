'use client';

import { useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Status } from '@prisma/client';

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
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Api } from '@/services/api-client';
import { useNotificationWithTimer } from '@/hooks/use-notification-with-timer';
import { TUnitFormData, UnitFormSchema } from '@/schemas/unit-form-schema';
import { unit } from '@/actions/unit';

export const UnitForm = ({ id }: { id?: number }) => {
  const router = useRouter();

  const { error, success, setError, setSuccess } = useNotificationWithTimer();

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
      setError('');
      setSuccess('');

      unit(values, id)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          }
          if (data?.success) {
            router.refresh();
            setSuccess(data.success);
          }
        })
        .catch(() => setError('Что-то пошло не так!'));
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
                <FormLabel>Наименование</FormLabel>
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
                <FormLabel>Статус</FormLabel>
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
                    <SelectItem value={Status.ACTIVE}>Active</SelectItem>
                    <SelectItem value={Status.ARCHIVE}>Archive</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {success && <FormSuccess message={success} />}
        {error && <FormError message={error} />}

        <Button type="submit" className="w-full" disabled={isPending}>
          Сохранить
        </Button>
      </form>
    </Form>
  );
};
