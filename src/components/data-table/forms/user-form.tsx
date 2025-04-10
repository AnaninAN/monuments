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
import { LoadingFormHeader } from '@/components/loading/loading-form-header';
import { useDataTableStore } from '@/store/data-table';

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

  if (isLoading) {
    return <LoadingFormHeader />;
  }

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
    </Form>
  );
}
