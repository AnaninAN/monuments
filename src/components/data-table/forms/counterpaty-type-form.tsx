'use client';

import { useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
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
import { Textarea } from '@/components/ui/textarea';
import { FormHeader } from '@/components/data-table/forms/form-header';

import {
  CounterpartyTypeFormSchema,
  TCounterpartyTypeFormData,
} from '@/schemas/counterparty-type-form-schema';
import { counterpartyType } from '@/actions/counterparty-type';
import { Api } from '@/services/api-client';
import { translateColumnsCounterpartyType } from '@/lib/data-table/translate-colums-header';

export const CounterpartyTypeForm = ({ id }: { id?: number }) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<TCounterpartyTypeFormData>({
    resolver: zodResolver(CounterpartyTypeFormSchema),
    defaultValues: {
      name: '',
      comment: '',
      status: 'ACTIVE',
    },
  });

  useEffect(() => {
    if (id) {
      (async function () {
        const data = await Api.counterpartyTypes.fetchCounterpartyTypeById(id);

        form.setValue('name', data.name);
        form.setValue('comment', data.comment);
        form.setValue('status', data.status);
      })();
    }
  }, [form, id]);

  const onSubmit = (values: TCounterpartyTypeFormData) => {
    startTransition(() => {
      counterpartyType(values, id)
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
          title="кат. контрагента"
        />
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {translateColumnsCounterpartyType[field.name]}
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
                  {translateColumnsCounterpartyType[field.name]}
                </FormLabel>
                <FormControl>
                  <Textarea placeholder="" className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
};
