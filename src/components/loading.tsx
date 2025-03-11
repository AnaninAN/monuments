import { Skeleton } from './ui/skeleton';

export default function Loading({ title }: { title?: string }) {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <h1 className="font-semibold self-center flex">{title}</h1>
        <div className="flex items-center py-4">
          <Skeleton className="h-[36px] w-[350px] mr-2" />
          <Skeleton className="h-[36px] w-[116px]" />
        </div>
      </div>
      <div className="pb-4 flex justify-end">
        <Skeleton className="h-[36px] w-[94px]" />
      </div>
      <div className="pb-4 flex">
        <Skeleton className="h-[84px] w-full" />
      </div>
    </div>
  );
}
