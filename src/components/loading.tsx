import { Spinner } from '@/components/ui/spinner';

export default function Loading({ title }: { title?: string }) {
  return (
    <div className="flex flex-col">
      <h1 className="font-semibold flex pb-5 pt-[6px]">{title}</h1>
      <Spinner size="lg" className="bg-black dark:bg-white" />;
    </div>
  );
}
