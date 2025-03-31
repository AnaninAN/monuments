import { createLogger, format, transports } from 'winston';

export type LogCategory = 'auth' | 'user' | 'counterpartyType' | 'counterparty';

const createCategoryLogger = (category: LogCategory) => {
  return createLogger({
    format: format.combine(format.timestamp(), format.json()),
    transports: [
      new transports.File({
        filename: `logs/${category}.log`,
        maxsize: 5242880,
        maxFiles: 5,
      }),
      new transports.Console({
        format: format.combine(format.colorize(), format.simple()),
      }),
    ],
  });
};

export const categoryLoggers: Record<
  LogCategory,
  ReturnType<typeof createCategoryLogger>
> = {
  auth: createCategoryLogger('auth'),
  user: createCategoryLogger('user'),
  counterpartyType: createCategoryLogger('counterpartyType'),
  counterparty: createCategoryLogger('counterparty'),
};
