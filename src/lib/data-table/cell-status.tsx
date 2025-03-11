import { Status } from '@prisma/client';

export const translateStatus: Record<Status, string> = {
  ACTIVE: 'Активный',
  ARCHIVE: 'Архивный',
};

export const CellStatus = (value: string) => (
  <div className="flex">
    {value === Status.ACTIVE && (
      <div className="bg-green-700 text-white py-1 px-2 rounded-md">
        {translateStatus[value]}
      </div>
    )}
    {value === Status.ARCHIVE && (
      <div className="bg-red-700 text-white py-1 px-2 rounded-md">
        {translateStatus[value]}
      </div>
    )}
  </div>
);
