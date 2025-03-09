import { useEffect, useState } from 'react';

export const useNotificationWithTimer = (time?: number) => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setError('');
      setSuccess('');
    }, time || 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [error, success, time]);

  return { error, success, setError, setSuccess };
};
