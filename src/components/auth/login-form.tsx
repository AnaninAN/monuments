'use client';

import { useTransition } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FormSuccess } from '@/components/form-success';
import { FormError } from '@/components/form-error';

import {
  LoginFormSchema,
  type TLoginFormData,
} from '@/schemas/login-form-schema';
import { login } from '@/actions/login';
import { useNotificationWithTimer } from '@/hooks/use-notification-with-timer';

export function LoginForm() {
  const searchParams = useSearchParams();

  const { error, success, setError, setSuccess } = useNotificationWithTimer();

  const callbackUrl = searchParams.get('callbackUrl');
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'email уже используется у другого провайдера'
      : '';

  const [isPending, startTransition] = useTransition();

  const form = useForm<TLoginFormData>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: TLoginFormData) => {
    startTransition(() => {
      setError('');
      setSuccess('');

      login(values, callbackUrl).then((data) => {
        if (data?.error) {
          form.reset();
          setError(data.error);
        }
        if (data?.success) {
          form.reset();
          setSuccess(data.success);
        }
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
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
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
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Пароль</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="введите пароль"
                            type="password"
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {success && <FormSuccess message={success} />}
                {error && <FormError message={error || urlError} />}

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
