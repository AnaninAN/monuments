'use client';

import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { Pencil, Plus } from 'lucide-react';
import { Role, Status } from '@prisma/client';
import { InputMask } from '@react-input/mask';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { DataSheet } from '@/components/data-table/data-sheet';
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

import {
  translateRole,
  translateStatus,
} from '@/lib/data-table/translate-cell-table';
import { findIdByName } from '@/lib/utils';

type FormFieldProps<T extends FieldValues = FieldValues> = {
  name: Path<T>;
  isPending: boolean;
  form: UseFormReturn<T>;
  translate: Record<string, string>;
  placeholder: string;
  type?: 'text' | 'number' | 'file' | 'password';
  className?: string;
  ButtonOpenForm?: React.ComponentType;
};

type FormFieldInputProps<T extends FieldValues = FieldValues> =
  FormFieldProps<T> & { step?: string };

type FormFieldInputMaskProps<T extends FieldValues = FieldValues> =
  FormFieldProps<T> & { options: object };

type FormFieldTextareaProps<T extends FieldValues = FieldValues> = Omit<
  FormFieldProps<T>,
  'type'
>;

type FormFieldSelectProps<T extends FieldValues = FieldValues> =
  FormFieldProps<T> & { items: { id: number; name: string }[] };

type FormFieldStatusSelectProps<T extends FieldValues = FieldValues> = {
  isPending: boolean;
  form: UseFormReturn<T>;
};

type FormFieldRoleSelectProps<T extends FieldValues = FieldValues> = {
  isPending: boolean;
  form: UseFormReturn<T>;
  translate: Record<string, string>;
};

export function FormFieldInput<T extends FieldValues = FieldValues>({
  name,
  form,
  isPending,
  translate,
  placeholder,
  type = 'text',
  step,
}: FormFieldInputProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <HoverCard>
              <FormLabel>
                <HoverCardTrigger>{translate[field.name]}</HoverCardTrigger>
              </FormLabel>
              <HoverCardContent align="start">
                <FormMessage />
              </HoverCardContent>
            </HoverCard>
            <FormControl>
              <Input
                id={name}
                placeholder={placeholder}
                disabled={isPending}
                type={type}
                step={step}
                {...form.register(name)}
              />
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
}

export function FormFieldInputMask<T extends FieldValues = FieldValues>({
  name,
  form,
  isPending,
  translate,
  type = 'text',
  options,
  placeholder,
}: FormFieldInputMaskProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <HoverCard>
            <FormLabel>
              <HoverCardTrigger>{translate[field.name]}</HoverCardTrigger>
            </FormLabel>
            <HoverCardContent align="start">
              <FormMessage />
            </HoverCardContent>
          </HoverCard>
          <FormControl>
            <InputMask
              {...options}
              showMask
              separate
              {...field}
              component={Input}
              disabled={isPending}
              type={type}
              placeholder={placeholder}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export function FormFieldTextarea<T extends FieldValues = FieldValues>({
  name,
  form,
  translate,
  placeholder,
  isPending,
}: FormFieldTextareaProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <HoverCard>
            <FormLabel>
              <HoverCardTrigger>{translate[field.name]}</HoverCardTrigger>
            </FormLabel>
            <HoverCardContent align="start">
              <FormMessage />
            </HoverCardContent>
          </HoverCard>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className="resize-none"
              disabled={isPending}
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export function FormFieldSelect<T extends FieldValues = FieldValues>({
  name,
  form,
  isPending,
  translate,
  placeholder,
  items,
  className,
  ButtonOpenForm,
}: FormFieldSelectProps<T>) {
  const value = form.getValues(name);
  const id = findIdByName(items, value);

  return (
    <div className="flex">
      <div className="flex-1">
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className={className}>
              <HoverCard>
                <FormLabel>
                  <HoverCardTrigger>
                    {translate[field.name.replace('.', '_')]}
                  </HoverCardTrigger>
                  <HoverCardContent align="start">
                    <FormMessage />
                  </HoverCardContent>
                </FormLabel>
              </HoverCard>
              <Select
                disabled={isPending}
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {items.map(({ id, name }) => (
                    <SelectItem key={id} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>
      {ButtonOpenForm && (
        <>
          <Button
            asChild
            className="flex self-end ml-2 cursor-pointer rounded-[50%] w-8 h-8 mb-[2px]"
          >
            <DataSheet trigger={<Plus />} FormComponent={ButtonOpenForm} />
          </Button>
          <Button
            asChild={value}
            className="flex self-end ml-2 cursor-pointer rounded-[50%] w-8 h-8 mb-[2px]"
            disabled={!value}
          >
            <DataSheet
              trigger={<Pencil />}
              id={id}
              FormComponent={ButtonOpenForm}
            />
          </Button>
        </>
      )}
    </div>
  );
}

export function FormFieldStatusSelect<T extends FieldValues = FieldValues>({
  form,
  isPending,
}: FormFieldStatusSelectProps<T>) {
  return (
    <div className="w-[120px]">
      <FormField
        control={form.control}
        name={'status' as Path<T>}
        render={({ field }) => (
          <FormItem>
            <Select
              disabled={isPending}
              onValueChange={field.onChange}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger
                  className={
                    field.value === Status.ACTIVE
                      ? 'bg-green-700 text-white'
                      : 'bg-red-700 text-white'
                  }
                >
                  <SelectValue placeholder="Выберите статус" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value={Status.ACTIVE}>
                  {translateStatus[Status.ACTIVE]}
                </SelectItem>
                <SelectItem value={Status.ARCHIVE}>
                  {translateStatus[Status.ARCHIVE]}
                </SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
        )}
      />
    </div>
  );
}

export function FormFieldRoleSelect<T extends FieldValues = FieldValues>({
  form,
  isPending,
  translate,
}: FormFieldRoleSelectProps<T>) {
  return (
    <div>
      <FormField
        control={form.control}
        name={'role' as Path<T>}
        render={({ field }) => (
          <FormItem>
            <HoverCard>
              <FormLabel>
                <HoverCardTrigger>{translate[field.name]}</HoverCardTrigger>
                <HoverCardContent align="start">
                  <FormMessage />
                </HoverCardContent>
              </FormLabel>
            </HoverCard>
            <Select
              disabled={isPending}
              onValueChange={field.onChange}
              value={field.value}
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
          </FormItem>
        )}
      />
    </div>
  );
}
