import { FieldValues, UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FormFieldStatusSelect } from '@/components/data-table/forms/form-field';

interface FormHeaderProps<T extends FieldValues = FieldValues> {
  id?: number;
  status?: boolean;
  title: string;
  isPending: boolean;
  form: UseFormReturn<T>;
  setSubmit?: (flag: boolean) => void;
}

export function FormHeader<T extends FieldValues = FieldValues>({
  id,
  status = false,
  form,
  isPending,
  title,
  setSubmit,
}: FormHeaderProps<T>) {
  return (
    <>
      <div className="flex justify-between items-center pb-4">
        <h1 className="font-semibold text-xl">
          {id ? `Изменить ${title} №${id}` : `Добавить ${title}`}
        </h1>
        <div className="flex gap-4">
          <Button
            onClick={() => setSubmit?.(true)}
            type="submit"
            disabled={isPending}
          >
            {id ? 'Сохранить' : 'Создать'}
          </Button>
          {status && (
            <FormFieldStatusSelect form={form} isPending={isPending} />
          )}
        </div>
      </div>
      <Separator />
    </>
  );
}
