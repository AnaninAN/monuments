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
  FormFieldInputMask,
  FormFieldRoleSelect,
} from '@/components/data-table/forms/form-field';

import { TUserFormData, UserFormSchema } from '@/schemas/user-form-schema';
import { Api } from '@/services/api-client';
import { user } from '@/actions/user';
import { translateColumnsEmployees } from '@/lib/data-table/translate-colums-header';
import { useTransitionNoErrors } from '@/hooks/use-transition-no-errors';

const primaryPhoneOptions = {
  mask: '+7 (___) ___-__-__',
  replacement: { _: /\d/ },
};

export function UserForm({ id }: { id?: number }) {
  const form = useForm<TUserFormData>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      email: '',
      name: '',
      lastname: '',
      status: 'ACTIVE',
      role: 'OPERATOR',
      phoneNumber: '',
    },
  });

  const router = useRouter();

  const { isPending, startTransitionNoErrors } = useTransitionNoErrors(form);

  useEffect(() => {
    if (id) {
      (async function () {
        const data = await Api.users.fetchUserByIdInt(id);

        form.setValue('email', data.email);
        form.setValue('name', data.name);
        form.setValue('lastname', data.lastname);
        form.setValue('role', data.role);
        form.setValue('status', data.status);
        form.setValue('phoneNumber', data.phoneNumber);
      })();
    }
  }, [form, id]);

  const onSubmit = (values: TUserFormData) => {
    startTransitionNoErrors(() => {
      user(values, id)
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
          title="пользователя"
        />
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <FormFieldInput
              form={form}
              name="email"
              placeholder="test@monuments.ru"
              translate={translateColumnsEmployees}
              isPending={isPending}
            />
          </div>
          <div className="grid gap-2">
            <FormFieldInput
              form={form}
              name="name"
              placeholder="Введите имя пользователя"
              translate={translateColumnsEmployees}
              isPending={isPending}
            />
          </div>
          <div className="grid gap-2">
            <FormFieldInput
              form={form}
              name="lastname"
              placeholder="Введите фамилию пользователя"
              translate={translateColumnsEmployees}
              isPending={isPending}
            />
          </div>
          <div className="grid gap-2">
            <FormFieldInputMask
              form={form}
              name="phoneNumber"
              placeholder="+7 (___) ___-__-__"
              translate={translateColumnsEmployees}
              isPending={isPending}
              options={primaryPhoneOptions}
            />
          </div>
          <div className="grid gap-2">
            <FormFieldRoleSelect
              form={form}
              translate={translateColumnsEmployees}
              isPending={isPending}
            />
          </div>
        </div>
      </form>
    </Form>
  );
}
