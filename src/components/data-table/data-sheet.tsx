'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ReactNode } from 'react';

interface DataSheetProps {
  trigger: string | ReactNode;
  FormComponent?: React.ComponentType<{
    id?: number;
  }>;
  id?: number;
}

export function DataSheet({ trigger, FormComponent, id }: DataSheetProps) {
  return (
    <Sheet>
      <SheetTrigger
        asChild
        className="text-blue-600 hover:underline cursor-pointer"
      >
        <span>{trigger}</span>
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
