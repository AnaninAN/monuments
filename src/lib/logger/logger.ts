import * as fs from 'fs';
import * as path from 'path';

import { categoryLoggers, LogCategory } from './logger-category';

type LogLevel = 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: unknown;
  userId?: string;
  category: LogCategory;
}

interface WinstonLogData {
  timestamp: string;
  level: string;
  message: string;
  userId?: string;
  [key: string]: unknown;
}

class Logger {
  private static instance: Logger;

  private constructor() {}

  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private log(
    category: LogCategory,
    level: LogLevel,
    message: string,
    data?: unknown,
    userId?: string
  ) {
    const entry: LogEntry = {
      timestamp: new Date().toLocaleString('ru-RU'),
      level,
      message,
      data,
      userId,
      category,
    };

    console.log(
      `[${entry.timestamp}] [${category.toUpperCase()}] ${level.toUpperCase()}: ${message}`,
      data || '',
      userId || ''
    );

    const logData = {
      ...(typeof data === 'object' ? data : {}),
      userId,
      timestamp: entry.timestamp,
    };

    const categoryLogger = categoryLoggers[category];
    switch (level) {
      case 'info':
        categoryLogger.info(message, logData);
        break;
      case 'warn':
        categoryLogger.warn(message, logData);
        break;
      case 'error':
        categoryLogger.error(message, logData);
        break;
    }
  }

  info(
    logCategory: LogCategory,
    message: string,
    data?: unknown,
    userId?: string
  ) {
    this.log(logCategory, 'info', message, data, userId);
  }

  warn(
    logCategory: LogCategory,
    message: string,
    data?: unknown,
    userId?: string
  ) {
    this.log(logCategory, 'warn', message, data, userId);
  }

  error(
    logCategory: LogCategory,
    message: string,
    data?: unknown,
    userId?: string
  ) {
    this.log(logCategory, 'error', message, data, userId);
  }

  getLogs(category: LogCategory): LogEntry[] {
    const logFile = path.join(process.cwd(), 'logs', `${category}.log`);

    try {
      if (!fs.existsSync(logFile)) {
        return [];
      }

      const logContent = fs.readFileSync(logFile, 'utf-8');
      return logContent
        .split('\n')
        .filter((line: string) => line.trim())
        .map((line: string): LogEntry | null => {
          try {
            const logData = JSON.parse(line) as WinstonLogData;
            return {
              timestamp: logData.timestamp,
              level: logData.level.toLowerCase() as LogLevel,
              message: logData.message,
              data: logData,
              category: category,
            };
          } catch {
            return null;
          }
        })
        .filter((entry: LogEntry | null): entry is LogEntry => entry !== null);
    } catch (error) {
      console.error(`Ошибка чтения журнала для категории ${category}:`, error);
      return [];
    }
  }

  clearLogs(category: LogCategory): boolean {
    const logFile = path.join(process.cwd(), 'logs', `${category}.log`);

    try {
      if (!fs.existsSync(logFile)) {
        return false;
      }

      fs.writeFileSync(logFile, '');
      return true;
    } catch (error) {
      console.error(`Ошибка очистки журнала для категории ${category}:`, error);
      return false;
    }
  }
}

export const logger = Logger.getInstance();
