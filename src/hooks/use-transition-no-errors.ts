import { useTransition } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

interface useTransitionNoErrorsResult {
  isPending: boolean;
  startTransitionNoErrors: (callback: () => void) => void;
}

export function useTransitionNoErrors<T extends FieldValues = FieldValues>(
  form: UseFormReturn<T>
): useTransitionNoErrorsResult {
  const [isPending, startTransition] = useTransition();

  const startTransitionNoErrors = (callback: () => void) => {
    startTransition(() => {
      if (Object.keys(form.formState.errors).length === 0) {
        callback();
      }
    });
  };

  return { isPending, startTransitionNoErrors };
}
