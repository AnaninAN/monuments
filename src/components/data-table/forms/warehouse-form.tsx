'use client';

import { useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { FormHeader } from '@/components/data-table/forms/form-header';

import { Api } from '@/services/api-client';
import { warehouse } from '@/actions/warehouse';
import {
  TWarehouseFormData,
  WarehouseFormSchema,
} from '@/schemas/warehouse-form-schema';
import { translateColumnsWarehouses } from '@/lib/data-table/translate-colums-header';

export function WarehouseForm({ id }: { id?: number }) {
  const router = useRouter();

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
      warehouse(values, id)
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-8 py-2"
      >
        <FormHeader
          id={id}
          form={form}
          name="status"
          isPending={isPending}
          title="склад"
        />
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
        </div>
      </form>
    </Form>
  );
}
