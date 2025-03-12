'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { ResetFormSchema, TResetFormData } from '@/schemas/reset-form-schema';
import { reset } from '@/actions/reset';

export const ResetForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<TResetFormData>({
    resolver: zodResolver(ResetFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (values: TResetFormData) => {
    startTransition(() => {
      reset(values).then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        }
        if (data?.success) {
          toast.success(data?.success);
        }
      });
    });
  };

  return (
    <CardWrapper
      headerTitle="Восстановление"
      headerLabel="Забыли пароль?"
      // backButtonLabel="Вход"
      // backButtonHref="/auth/login"
      // showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email пользователя</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="test@monuments.ru"
                      type="email"
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
