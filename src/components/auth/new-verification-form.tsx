'use client';

import { useCallback, useEffect } from 'react';
import { BeatLoader } from 'react-spinners';
import { useSearchParams } from 'next/navigation';

import { CardWrapper } from '@/components/auth/card-wrapper';
import { newVerification } from '@/actions/new-verification';
import { toast } from 'sonner';

export const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    if (!token) {
      toast.error('Токен отсутствует!');
      return;
    }

    newVerification(token)
      .then((data) => {
        toast.success(data.success);
        toast.error(data.error);
      })
      .catch(() => {
        toast.error('Что-то пошло не так!');
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerTitle="Подтверждение"
      headerLabel="Подтвердите вашу верификацию"
      // backButtonLabel="Вход"
      // backButtonHref="/auth/login"
    >
      <div className="flex items-center justify-center w-full">
        <BeatLoader />
      </div>
    </CardWrapper>
  );
};
