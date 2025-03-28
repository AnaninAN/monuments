'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Form } from '@/components/ui/form';
import { FormHeader } from '@/components/data-table/forms/form-header';
import {
  FormFieldInput,
  FormFieldTextarea,
} from '@/components/data-table/forms/form-field';

import { Api } from '@/services/api-client';
import { warehouse } from '@/actions/warehouse';
import {
  TWarehouseFormData,
  WarehouseFormSchema,
} from '@/schemas/warehouse-form-schema';
import { translateColumnsWarehouses } from '@/lib/data-table/translate-colums-header';
import { useTransitionNoErrors } from '@/hooks/use-transition-no-errors';

export function WarehouseForm({ id }: { id?: number }) {
  const form = useForm<TWarehouseFormData>({
    resolver: zodResolver(WarehouseFormSchema),
    defaultValues: {
      name: '',
      shortName: '',
      comment: '',
      status: 'ACTIVE',
    },
  });

  const router = useRouter();

  const { isPending, startTransitionNoErrors } = useTransitionNoErrors(form);

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
    startTransitionNoErrors(() => {
      warehouse(values, id)
        .then((data) => {
          if (data?.error) {
            toast.error(data.error);
          }
          if (data?.success) {
            router.refresh();
            if (!id) form.reset();
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
          status
          isPending={isPending}
          title="склад"
        />
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <FormFieldInput
              form={form}
              name="name"
              placeholder="Введите наименование склада"
              translate={translateColumnsWarehouses}
              isPending={isPending}
            />
          </div>
          <div className="grid gap-2">
            <FormFieldInput
              form={form}
              name="shortName"
              placeholder="Введите краткое наименование склада"
              translate={translateColumnsWarehouses}
              isPending={isPending}
            />
          </div>
          <div className="grid gap-2">
            <FormFieldTextarea
              form={form}
              name="comment"
              placeholder="Введите комментарий"
              translate={translateColumnsWarehouses}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
