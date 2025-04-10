'use client';

import { ReactNode, useState } from 'react';

import { FormComponent } from '@/types/types';

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
  FormComponent?: FormComponent;
  id?: number;
}

export function DataSheet({
  trigger,
  FormComponent,
  id,
  className,
}: DataSheetProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <span className={className}>{trigger}</span>
      </SheetTrigger>
      <SheetContent className="w-10/12">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        {FormComponent && (
          <FormComponent id={id} closeSheet={() => setOpen(false)} />
        )}
      </SheetContent>
    </Sheet>
  );
}
