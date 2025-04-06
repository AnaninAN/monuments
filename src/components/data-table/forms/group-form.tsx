'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { translateColumnsGroup } from '@/lib/data-table/translate-colums-header';
import { useTransitionNoErrors } from '@/hooks/use-transition-no-errors';
import { GroupFormSchema, TGroupFormData } from '@/schemas/group-form-schema';

import { Form } from '@/components/ui/form';
import { FormFieldInput } from '@/components/data-table/forms/form-field';
import { Button } from '@/components/ui/button';
import { Action, GetGroupById } from '@/components/data-table/three-table';

interface GroupFormProps {
  id?: number;
  getGroupById?: GetGroupById;
  action?: Action;
}

export const GroupForm = ({ id, getGroupById, action }: GroupFormProps) => {
  const router = useRouter();

  const form = useForm<TGroupFormData>({
    resolver: zodResolver(GroupFormSchema),
    defaultValues: {
      name: '',
      parentname: parent.name,
    },
  });

  const { isPending, startTransitionNoErrors } = useTransitionNoErrors(form);

  useEffect(() => {
    if (id) {
      const fetchGroupData = async () => {
        try {
          const data = await getGroupById?.(id);
          form.setValue('parentname', data?.parentname ?? '');
          form.setValue('name', data?.name ?? '');
        } catch (error) {
          console.error('Ошибка при получении данных об группе:', error);
          toast.error('Ошибка при загрузке данных группы!');
        }
      };
      fetchGroupData();
    }
  }, [getGroupById, form, id]);

  const onSubmit = (values: TGroupFormData) => {
    startTransitionNoErrors(async () => {
      try {
        const data = await action?.(values, id);

        if (data?.error) {
          router.refresh();
          if (!id) form.reset();
          toast.error(data.error);
          return;
        }

        if (data?.success) {
          toast.success(data.success);
        }
      } catch (error) {
        toast.error('Произошла ошибка при сохранении группы!');
        console.error('Ошибка отправки группы:', error);
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-8 py-2"
      >
        <div className="flex">
          <FormFieldInput
            form={form}
            name="parentname"
            placeholder="Родительская группа"
            translate={translateColumnsGroup}
            isPending={true}
          />
        </div>
        <div className="grid gap-2">
          <FormFieldInput
            form={form}
            name="name"
            placeholder="Введите наименование группы"
            translate={translateColumnsGroup}
            isPending={isPending}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={isPending}>
            {id ? 'Сохранить' : 'Создать'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
