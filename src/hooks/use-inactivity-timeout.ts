'use client';

import { useEffect } from 'react';
import { signOut } from 'next-auth/react';

const DEFAULT_INACTIVITY_TIMEOUT = 30 * 60 * 1000;

export const useInactivityTimeout = (
  timeoutMs: number = DEFAULT_INACTIVITY_TIMEOUT
) => {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const resetTimeout = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        signOut({ callbackUrl: '/auth/login' });
      }, timeoutMs);
    };

    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
    ];
    events.forEach((event) => {
      window.addEventListener(event, resetTimeout);
    });

    resetTimeout();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      events.forEach((event) => {
        window.removeEventListener(event, resetTimeout);
      });
    };
  }, [timeoutMs]);
};
