import { Status } from '@prisma/client';

export const translateStatus: Record<Status, string> = {
  ACTIVE: 'Активный',
  ARCHIVE: 'Архивный',
};

export const CellStatus = ({ value }: { value: Status }) => {
  return (
    <div className="flex justify-end pr-3">
      {value === Status.ACTIVE && (
        <span className="bg-green-700 text-white py-1 px-2 rounded-md">
          {translateStatus[value]}
        </span>
      )}
      {value === Status.ARCHIVE && (
        <span className="bg-red-700 text-white py-1 px-2 rounded-md">
          {translateStatus[value]}
        </span>
      )}
    </div>
  );
};
