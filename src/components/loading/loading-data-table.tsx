import { Skeleton } from '../ui/skeleton';

export const LoadingDataTable = ({ title }: { title?: string }) => {
  return (
    <div>
      <h1 className="font-semibold self-center flex">{title}</h1>
      <div className="flex">
        <div className="w-full">
          <div className="flex py-8 justify-end">
            <Skeleton className="h-[36px] w-[350px] mr-2" />
            <Skeleton className="h-[36px] w-[116px]" />
          </div>

          <div className="pb-4 flex justify-end">
            <Skeleton className="h-[36px] w-[94px]" />
          </div>
          <div className="pb-4 flex">
            <Skeleton className="h-[84px] w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
