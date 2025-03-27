'use client';

import { useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { InputMask } from '@react-input/mask';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Role } from '@prisma/client';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormHeader } from '@/components/data-table/forms/form-header';

import { TUserFormData, UserFormSchema } from '@/schemas/user-form-schema';
import { Api } from '@/services/api-client';
import { user } from '@/actions/user';
import { translateColumnsEmployees } from '@/lib/data-table/translate-colums-header';
import { translateRole } from '@/lib/data-table/translate-cell-table';

const primaryPhoneOptions = {
  mask: '+7 (___) ___-__-__',
  replacement: { _: /\d/ },
};

export function UserForm({ id }: { id?: number }) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

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
    startTransition(() => {
      user(values, id)
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
          title="пользователя"
        />
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translateColumnsEmployees[field.name]}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="test@monuments.ru"
                      disabled={isPending}
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translateColumnsEmployees[field.name]}</FormLabel>
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
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translateColumnsEmployees[field.name]}</FormLabel>
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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translateColumnsEmployees[field.name]}</FormLabel>
                  <FormControl>
                    <InputMask
                      {...primaryPhoneOptions}
                      showMask
                      separate
                      placeholder=""
                      {...field}
                      component={Input}
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
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{translateColumnsEmployees[field.name]}</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите роль" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={Role.ADMIN}>
                        {translateRole[Role.ADMIN]}
                      </SelectItem>
                      <SelectItem value={Role.OPERATOR}>
                        {translateRole[Role.OPERATOR]}
                      </SelectItem>
                    </SelectContent>
                  </Select>
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
