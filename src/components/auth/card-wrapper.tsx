'use client';

import { PropsWithChildren } from 'react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Header } from '@/components/auth/header';

interface CardWrapperProps {
  headerTitle: string;
  headerLabel: string;
}

export const CardWrapper = ({
  headerTitle,
  headerLabel,
  children,
}: PropsWithChildren<CardWrapperProps>) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header title={headerTitle} label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};
