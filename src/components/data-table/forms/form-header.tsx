import { Status } from '@prisma/client';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

import { translateStatus } from '@/lib/data-table/translate-cell-table';

interface FormHeaderProps<T extends FieldValues = FieldValues> {
  id?: number;
  name?: Path<T>;
  title: string;
  isPending: boolean;
  form: UseFormReturn<T>;
}

export function FormHeader<T extends FieldValues = FieldValues>({
  id,
  name,
  form,
  isPending,
  title,
}: FormHeaderProps<T>) {
  return (
    <>
      <div className="flex justify-between items-center pb-4">
        <h1 className="font-semibold text-xl">
          {id ? `Изменить ${title} №${id}` : `Добавить ${title}`}
        </h1>
        <div className="flex gap-4">
          <Button type="submit" className="" disabled={isPending}>
            {id ? 'Сохранить' : 'Создать'}
          </Button>
          {name && (
            <div className="w-[120px]">
              <FormField
                control={form.control}
                name={name}
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
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>
      </div>
      <Separator />
    </>
  );
}
