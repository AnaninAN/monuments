'use client';

import { ReactNode } from 'react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface DataSheetProps {
  trigger: string | ReactNode;
  className?: string;
  FormComponent?: React.ComponentType<{
    id?: number;
  }>;
  id?: number;
}

export function DataSheet({
  trigger,
  FormComponent,
  id,
  className,
}: DataSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <span className={className}>{trigger}</span>
      </SheetTrigger>
      <SheetContent className="w-10/12">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        {FormComponent && <FormComponent id={id} />}
      </SheetContent>
    </Sheet>
  );
}
