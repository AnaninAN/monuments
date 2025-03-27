import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
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

type FormFieldProps<T extends FieldValues = FieldValues> = {
  name: Path<T>;
  isPending: boolean;
  form: UseFormReturn<T>;
  translate: Record<string, string>;
  placeholder: string;
  items: { id: number; name: string }[];
  type?: 'text' | 'number' | 'file';
};

type FormFieldInputProps<T extends FieldValues = FieldValues> = Omit<
  FormFieldProps<T>,
  'items'
>;

type FormFieldTextareaProps<T extends FieldValues = FieldValues> = Omit<
  FormFieldProps<T>,
  'items' | 'isPending' | 'type'
>;

type FormFieldSelectProps<T extends FieldValues = FieldValues> = Omit<
  FormFieldProps<T>,
  'type'
>;

export function FormFieldInput<T extends FieldValues = FieldValues>({
  name,
  form,
  isPending,
  translate,
  placeholder,
  type = 'text',
}: FormFieldInputProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { formItemId } = useFormField();

        return (
          <FormItem>
            <FormLabel>{translate[field.name]}</FormLabel>
            <FormControl>
              <Input
                id={formItemId}
                placeholder={placeholder}
                disabled={isPending}
                type={type}
                {...form.register(name)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export function FormFieldTextarea<T extends FieldValues = FieldValues>({
  name,
  form,
  translate,
  placeholder,
}: FormFieldTextareaProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{translate[field.name]}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className="resize-none"
              {...field}
            />
          </FormControl>
          <FormMessage />
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
}: FormFieldSelectProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{translate[field.name.replace('.', '_')]}</FormLabel>
          <Select
            disabled={isPending}
            onValueChange={field.onChange}
            value={field.value}
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
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
