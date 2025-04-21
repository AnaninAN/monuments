'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from '@/components/ui/sonner';

import { ThemeProvider } from '@/components/theme-provider';
import ConfirmationDialog from '@/components/confirmation-dialog';
import { useInactivityTimeout } from '@/hooks/use-inactivity-timeout';

export const Providers = ({ children }: PropsWithChildren) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useInactivityTimeout();

  if (!mounted) {
    return null;
  }

  return (
    <>
      <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </SessionProvider>
      <Toaster
        toastOptions={{
          classNames: {
            error: 'bg-red-500',
            success: 'bg-green-300',
          },
        }}
      />
      <ConfirmationDialog />
    </>
  );
};
