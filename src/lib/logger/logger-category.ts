import { createLogger, format, transports } from 'winston';

export type LogCategory =
  | 'auth'
  | 'user'
  | 'counterpartyType'
  | 'counterparty'
  | 'warehouseGroup'
  | 'materialGroup';

const createCategoryLogger = (category: LogCategory) => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  const options = {
    format: format.combine(format.timestamp(), format.json()),
    transports: [
      new transports.Console({
        format: format.combine(format.colorize(), format.simple()),
      }),
    ] as Array<
      transports.ConsoleTransportInstance | transports.FileTransportInstance
    >,
  };

  if (isDevelopment) {
    options.transports.push(
      new transports.File({
        filename: `logs/${category}.log`,
        maxsize: 5242880,
        maxFiles: 5,
      })
    );
  }

  return createLogger(options);
};

export const categoryLoggers: Record<
  LogCategory,
  ReturnType<typeof createCategoryLogger>
> = {
  auth: createCategoryLogger('auth'),
  user: createCategoryLogger('user'),
  counterpartyType: createCategoryLogger('counterpartyType'),
  counterparty: createCategoryLogger('counterparty'),
  warehouseGroup: createCategoryLogger('warehouseGroup'),
  materialGroup: createCategoryLogger('materialGroup'),
};
