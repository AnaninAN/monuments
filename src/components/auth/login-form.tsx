'use client';

import { useTransition } from 'react';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';

import { type TLoginFormData } from '@/schemas/login-form-schema';
import { useLoginData } from '@/hooks/data-table/use-login-data';
import { FormFieldInput } from '../data-table/forms/form-field';
import { translateColumnLogin } from '@/lib/data-table/translate-colums-header';

export function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [isPending, startTransition] = useTransition();
  const { form, handleLoginSubmit } = useLoginData();

  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'email уже используется у другого провайдера'
      : '';

  const onSubmit = (values: TLoginFormData) => {
    startTransition(() => {
      handleLoginSubmit(values, callbackUrl, urlError, () => {
        form.reset();
      });
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden">
        <CardContent className="grid p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Авторизация</h1>
                  <p className="text-balance text-muted-foreground">
                    Вход в систему
                  </p>
                </div>
                <div className="grid gap-2">
                  <FormFieldInput
                    form={form}
                    name="email"
                    placeholder="test@monuments.ru"
                    translate={translateColumnLogin}
                    isPending={isPending}
                  />
                </div>
                <div className="grid gap-2">
                  <FormFieldInput
                    form={form}
                    name="password"
                    placeholder="Введите пароль"
                    translate={translateColumnLogin}
                    isPending={isPending}
                    type="password"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full mt-1"
                  disabled={isPending}
                >
                  Войти
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
