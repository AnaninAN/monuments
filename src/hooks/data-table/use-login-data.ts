import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { LoginFormSchema, TLoginFormData } from '@/schemas/login-form-schema';
import { login } from '@/actions/login';

const handleLoginSubmit = async (
  values: TLoginFormData,
  callbackUrl?: string | null,
  urlError?: string,
  onSuccess?: () => void
) => {
  try {
    const data = await login(values, callbackUrl);

    if (data?.error) {
      toast.error(data.error || urlError);
      return;
    }

    if (data?.success) {
      onSuccess?.();
      toast.success(data.success);
    }
  } catch (error) {
    console.error('Ошибка при входе в систему:', error);
  }
};

export const useLoginData = () => {
  const form = useForm<TLoginFormData>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return { form, handleLoginSubmit };
};
