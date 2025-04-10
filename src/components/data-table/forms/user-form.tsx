'use client';

import { TUserFormData } from '@/schemas/user-form-schema';
import { translateColumnsUser } from '@/lib/data-table/translate-colums-header';
import { useTransitionNoErrors } from '@/hooks/use-transition-no-errors';
import { useUserData } from '@/hooks/data-table/use-user-data';

import { Form } from '@/components/ui/form';
import { FormHeader } from '@/components/data-table/forms/form-header';
import {
  FormFieldInput,
  FormFieldInputMask,
  FormFieldRoleSelect,
} from '@/components/data-table/forms/form-field';
import { useDataTableStore } from '@/store/data-table';
import { Spin } from '@/components/ui/spin';

const primaryPhoneOptions = {
  mask: '+7 (___) ___-__-__',
  replacement: { _: /\d/ },
};

interface UserFormProps {
  id?: number;
}

export function UserForm({ id }: UserFormProps) {
  const { setCountDataTable } = useDataTableStore();
  const { form, handleUserSubmit, isLoading } = useUserData(id);
  const { isPending, startTransitionNoErrors } = useTransitionNoErrors(form);

  const onSubmit = (values: TUserFormData) => {
    startTransitionNoErrors(() => {
      handleUserSubmit(values, id, (count) => {
        setCountDataTable(count);
        if (!id) form.reset();
      });
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 px-8 py-2 relative"
      >
        <FormHeader
          id={id}
          form={form}
          status
          isPending={isPending}
          title="пользователя"
        />
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <FormFieldInput
              form={form}
              name="email"
              placeholder="test@monuments.ru"
              translate={translateColumnsUser}
              isPending={isPending}
            />
          </div>
          <div className="grid gap-2">
            <FormFieldInput
              form={form}
              name="name"
              placeholder="Введите имя пользователя"
              translate={translateColumnsUser}
              isPending={isPending}
            />
          </div>
          <div className="grid gap-2">
            <FormFieldInput
              form={form}
              name="lastname"
              placeholder="Введите фамилию пользователя"
              translate={translateColumnsUser}
              isPending={isPending}
            />
          </div>
          <div className="grid gap-2">
            <FormFieldInputMask
              form={form}
              name="phoneNumber"
              placeholder="+7 (___) ___-__-__"
              translate={translateColumnsUser}
              isPending={isPending}
              options={primaryPhoneOptions}
            />
          </div>
          <div className="grid gap-2">
            <FormFieldRoleSelect
              form={form}
              translate={translateColumnsUser}
              isPending={isPending}
            />
          </div>
        </div>
      </form>
      {isLoading && (
        <div className="space-y-4 px-8 py-2 w-full h-full bg-gray-100/50 absolute top-0 left-0">
          <Spin />
        </div>
      )}
    </Form>
  );
}
