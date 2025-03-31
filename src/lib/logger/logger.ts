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

class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];

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

    this.logs.push(entry);

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

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  clearLogs() {
    this.logs = [];
  }
}

export const logger = Logger.getInstance();
