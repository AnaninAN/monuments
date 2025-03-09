import Link from 'next/link';

import { Button } from '@/components/ui/button';

interface BackButton {
  label: string;
  href: string;
}

export const BackButton = ({ label, href }: BackButton) => {
  return (
    <Button variant="link" className="font-normal w-full" size="sm" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};
