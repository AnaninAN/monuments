'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { CardWrapper } from '@/components/auth/card-wrapper';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  NewPasswordFormSchema,
  TNewPasswordFormData,
} from '@/schemas/new-password-form-schema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { newPassword } from '@/actions/new-password';

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [isPending, startTransition] = useTransition();

  const form = useForm<TNewPasswordFormData>({
    resolver: zodResolver(NewPasswordFormSchema),
    defaultValues: {
      password: '',
    },
  });

  const onSubmit = (values: TNewPasswordFormData) => {
    startTransition(() => {
      newPassword(values, token).then((data) => {
        toast.error(data?.error);
        toast.success(data?.success);
      });
    });
  };

  return (
    <CardWrapper
      headerTitle="Восстановление"
      headerLabel="Введите новый пароль"
      // backButtonLabel="Вход"
      // backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email пользователя</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="******"
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            Сбросить пароль
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
