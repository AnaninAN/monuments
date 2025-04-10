'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { translateColumnsGroup } from '@/lib/data-table/translate-colums-header';
import { useTransitionNoErrors } from '@/hooks/use-transition-no-errors';
import { GroupFormSchema, TGroupFormData } from '@/schemas/group-form-schema';
import { Entity, TreeNode } from '@/types/types';

import { Form } from '@/components/ui/form';
import { FormFieldInput } from '@/components/data-table/forms/form-field';
import { Button } from '@/components/ui/button';
import { useDataTableStore } from '@/store/data-table';
import { getEntityGroupByIdData } from '@/data/entity-group';
import { entityGroupAction } from '@/actions/entity-group';

interface GroupFormProps {
  parent?: TreeNode;
  id?: number;
  entity: Entity;
}

export const GroupForm = ({ parent, id, entity }: GroupFormProps) => {
  const { setCountGroup } = useDataTableStore();

  const form = useForm<TGroupFormData>({
    resolver: zodResolver(GroupFormSchema),
    defaultValues: {
      name: '',
      parentname: parent?.name ?? '',
      parentId: parent?.id ?? 0,
    },
  });

  const { isPending, startTransitionNoErrors } = useTransitionNoErrors(form);

  useEffect(() => {
    if (id) {
      const fetchGroupData = async () => {
        try {
          const data = await getEntityGroupByIdData(entity, id);

          form.setValue('parentname', data?.parentname ?? '');
          form.setValue('name', data?.name ?? '');
          form.setValue('parentId', data?.parentId ?? 1);
        } catch (error) {
          console.error('Ошибка при получении данных об группе:', error);
          toast.error('Ошибка при загрузке данных группы!');
        }
      };
      fetchGroupData();
    }
  }, [form, id, entity]);

  const onSubmit = (values: TGroupFormData) => {
    startTransitionNoErrors(async () => {
      try {
        const data = await entityGroupAction(entity, values, id);

        if (data?.error) {
          toast.error(data.error);
          return;
        }

        if (data?.success) {
          setCountGroup(data.count ?? 0);
          toast.success(data.success);
        }
      } catch (error) {
        toast.error('Произошла ошибка при сохранении группы!');
        console.error('Ошибка отправки группы:', error);
      } finally {
        if (!id) form.reset();
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
            isPending={parent?.id === 1 ? true : isPending}
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
