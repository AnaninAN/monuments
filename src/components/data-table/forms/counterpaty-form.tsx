'use client';

import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { CounterpartyType, Status } from '@prisma/client';

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
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  CounterpartyFormSchema,
  TCounterpartyFormData,
} from '@/schemas/counterparty-form-schema';
import { counterparty } from '@/actions/counterparty';
import { Api } from '@/services/api-client';
import { useNotificationWithTimer } from '@/hooks/use-notification-with-timer';
import { translateColumnsCounterparties } from '@/lib/data-table/translate-colums';

export const CounterpartyForm = ({ id }: { id?: number }) => {
  const router = useRouter();

  const { error, success, setError, setSuccess } = useNotificationWithTimer();

  const [counterpartyTypes, setCounterpartyTypes] = useState<
    CounterpartyType[]
  >([]);

  const [isPending, startTransition] = useTransition();

  const form = useForm<TCounterpartyFormData>({
    resolver: zodResolver(CounterpartyFormSchema),
    defaultValues: {
      name: '',
      comment: '',
      status: 'ACTIVE',
      // email: '',
      // INN: '',
      // KPP: '',
      // legalAddress: '',
      // OGRN: '',
      // phone: '',
      counterpartyType: {
        name: '',
      },
      counterpartyTypeId: 0,
    },
  });

  useEffect(() => {
    (async function fetchCounterpartyTypes() {
      const data = await Api.counterpartyTypes.fetchAllCounterpartyTypes();
      setCounterpartyTypes(data);
    })();

    if (id) {
      (async function () {
        const data = await Api.counterparties.fetchCounterpartiesById(id);

        form.setValue('name', data.name);
        form.setValue('comment', data.comment);
        form.setValue('status', data.status);
        // form.setValue('email', data.email);
        // form.setValue('INN', data.INN);
        // form.setValue('KPP', data.KPP);
        // form.setValue('legalAddress', data.legalAddress);
        // form.setValue('OGRN', data.OGRN);
        // form.setValue('phone', data.phone);
        form.setValue('counterpartyType.name', data.counterpartyType.name);
      })();
    }
  }, [form, id]);

  const onSubmit = async (values: TCounterpartyFormData) => {
    const newCounterpartyTypeId =
      counterpartyTypes.find(
        (types) => types.name === values.counterpartyType.name
      )?.id || values.counterpartyTypeId;

    const newValues: typeof values = {
      ...values,
      counterpartyTypeId: newCounterpartyTypeId,
    };

    startTransition(() => {
      setError('');
      setSuccess('');

      counterparty(newValues, id)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          }
          if (data?.success) {
            router.refresh();
            setSuccess(data.success);
          }
        })
        .catch(() => setError('Что-то пошло не так!'));
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {translateColumnsCounterparties[field.name]}
                </FormLabel>
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
            name="counterpartyType.name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {translateColumnsCounterparties['counterpartyType_name']}
                </FormLabel>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {counterpartyTypes.map(({ id, name }) => (
                      <SelectItem key={id} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {translateColumnsCounterparties[field.name]}
                </FormLabel>
                <FormControl>
                  <Textarea placeholder="" className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {translateColumnsCounterparties[field.name]}
                </FormLabel>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите статус" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={Status.ACTIVE}>Active</SelectItem>
                    <SelectItem value={Status.ARCHIVE}>Archive</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {success && <FormSuccess message={success} />}
        {error && <FormError message={error} />}

        <Button type="submit" className="w-full" disabled={isPending}>
          Сохранить
        </Button>
      </form>
    </Form>
  );
};
