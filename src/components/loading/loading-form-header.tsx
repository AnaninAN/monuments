import { Separator } from '../ui/separator';
import { Skeleton } from '../ui/skeleton';

export const LoadingFormHeader = () => {
  return (
    <div>
      <div className="space-y-4 px-8 py-2">
        <div className="flex justify-between items-center pb-4">
          <h1 className="font-semibold text-xl">
            <Skeleton className="h-[36px] w-[350px]" />
          </h1>
          <div className="flex gap-4">
            <Skeleton className="h-[36px] w-[94px]" />
            <Skeleton className="h-[36px] w-[124px]" />
          </div>
        </div>
        <Separator />
      </div>
    </div>
  );
};
