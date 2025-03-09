import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const phoneFormat = (s: string, plus: boolean = true) => {
  const startsWith = plus ? '+7' : '8';

  let phone = s.replace(/[^0-9]/g, '');
  if (phone.startsWith('7') && plus) {
    phone = phone.substring(1);
  }
  if (phone.startsWith('8')) {
    phone = phone.substring(1);
  }

  return phone.replace(
    /(\d{3})(\d{3})(\d{2})(\d{2})/g,
    `${startsWith} ($1) $2-$3-$4`
  );
};
