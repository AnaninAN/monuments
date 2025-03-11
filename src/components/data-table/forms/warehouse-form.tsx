'use client';

import { useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Status } from '@prisma/client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FormSuccess } from '@/components/form-success';
import { FormError } from '@/components/form-error';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { useNotificationWithTimer } from '@/hooks/use-notification-with-timer';
import { Api } from '@/services/api-client';
import { warehouse } from '@/actions/warehouse';
import {
  TWarehouseFormData,
  WarehouseFormSchema,
} from '@/schemas/warehouse-form-schema';
import { translateColumnsWarehouses } from '@/lib/data-table/translate-colums';

export function WarehouseForm({ id }: { id?: number }) {
  const router = useRouter();

  const { error, success, setError, setSuccess } = useNotificationWithTimer();

  const [isPending, startTransition] = useTransition();

  const form = useForm<TWarehouseFormData>({
    resolver: zodResolver(WarehouseFormSchema),
    defaultValues: {
      name: '',
      shortName: '',
      comment: '',
      status: 'ACTIVE',
    },
  });

  useEffect(() => {
    if (id) {
      (async function () {
        const data = await Api.warehouses.fetchWarehouseById(id);

        form.setValue('name', data.name);
        form.setValue('shortName', data.shortName);
        form.setValue('status', data.status);
        form.setValue('comment', data.comment);
      })();
    }
  }, [form, id]);

  const onSubmit = (values: TWarehouseFormData) => {
    startTransition(() => {
      setError('');
      setSuccess('');

      warehouse(values, id)
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {translateColumnsWarehouses[field.name]}
                  </FormLabel>
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
              name="shortName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {translateColumnsWarehouses[field.name]}
                  </FormLabel>
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
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {translateColumnsWarehouses[field.name]}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder=""
                      className="resize-none"
                      {...field}
                    />
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
                  <FormLabel>
                    {translateColumnsWarehouses[field.name]}
                  </FormLabel>
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
        </div>
      </form>
    </Form>
  );
}
