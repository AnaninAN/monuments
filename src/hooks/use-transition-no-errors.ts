import { useTransition } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

import { useStopPropagationStore } from '@/store/stop-propagation';
interface useTransitionNoErrorsResult {
  isPending: boolean;
  startTransitionNoErrors: (callback: () => void) => void;
}

export function useTransitionNoErrors<T extends FieldValues = FieldValues>(
  form: UseFormReturn<T>,
  submit: boolean = true
): useTransitionNoErrorsResult {
  const [isPending, startTransition] = useTransition();

  const { setSubmit } = useStopPropagationStore();

  const startTransitionNoErrors = (callback: () => void) => {
    startTransition(() => {
      if (Object.keys(form.formState.errors).length === 0 && submit) {
        callback();
        setSubmit(false);
      }
    });
  };

  return { isPending, startTransitionNoErrors };
}
