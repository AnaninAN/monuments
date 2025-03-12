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
import { FormHeader } from '@/components/data-table/forms/form-header';

import { Api } from '@/services/api-client';
import { TUnitFormData, UnitFormSchema } from '@/schemas/unit-form-schema';
import { unit } from '@/actions/unit';
import { translateColumnsUnits } from '@/lib/data-table/translate-colums-header';

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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-8 py-2"
      >
        <FormHeader
          id={id}
          form={form}
          name="status"
          isPending={isPending}
          title="ед. измерения"
        />
        <div className="flex">
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
      </form>
    </Form>
  );
};
