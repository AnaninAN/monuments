import { PropsWithChildren } from 'react';

import { Spin } from '@/components/ui/spin';

interface LoadingFormProps {
  isLoading: boolean;
}

export const LoadingForm = ({
  isLoading,
  children,
}: PropsWithChildren<LoadingFormProps>) => {
  return (
    <>
      {children}
      {isLoading && (
        <div className="space-y-4 px-8 py-2 w-full h-full bg-gray-100/50 absolute top-0 left-0">
          <Spin />
        </div>
      )}
    </>
  );
};
