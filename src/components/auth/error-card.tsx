import { CardWrapper } from '@/components/auth/card-wrapper';
import { TriangleAlert } from 'lucide-react';

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerTitle="Ошибка"
      headerLabel="Опа! Произошла ошибка!"
      // backButtonLabel="Вернуться назад для Входа"
      // backButtonHref="/auth/login"
    >
      <div className="w-full flex items-center justify-center">
        <TriangleAlert className="text-destructive" />
      </div>
    </CardWrapper>
  );
};
