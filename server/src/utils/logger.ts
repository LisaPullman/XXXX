import fs from 'fs';
import path from 'path';

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

class Logger {
  private logLevel: LogLevel;
  private logFile?: string;

  constructor() {
    this.logLevel = this.getLogLevel();
    this.logFile = process.env.LOG_FILE;
    this.ensureLogDirectory();
  }

  private getLogLevel(): LogLevel {
    const level = process.env.LOG_LEVEL?.toLowerCase() || 'info';
    switch (level) {
      case 'error': return LogLevel.ERROR;
      case 'warn': return LogLevel.WARN;
      case 'info': return LogLevel.INFO;
      case 'debug': return LogLevel.DEBUG;
      default: return LogLevel.INFO;
    }
  }

  private ensureLogDirectory(): void {
    if (this.logFile) {
      const logDir = path.dirname(this.logFile);
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }
    }
  }

  private formatMessage(level: string, message: string, ...args: any[]): string {
    const timestamp = new Date().toISOString();
    const formattedArgs = args.length > 0 ? ' ' + args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
    ).join(' ') : '';
    
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${formattedArgs}`;
  }

  private writeToFile(message: string): void {
    if (this.logFile) {
      try {
        fs.appendFileSync(this.logFile, message + '\n');
      } catch (error) {
        console.error('Failed to write to log file:', error);
      }
    }
  }

  private log(level: LogLevel, levelName: string, message: string, ...args: any[]): void {
    if (level <= this.logLevel) {
      const formattedMessage = this.formatMessage(levelName, message, ...args);
      
      // Console output with colors
      switch (level) {
        case LogLevel.ERROR:
          console.error('\x1b[31m%s\x1b[0m', formattedMessage);
          break;
        case LogLevel.WARN:
          console.warn('\x1b[33m%s\x1b[0m', formattedMessage);
          break;
        case LogLevel.INFO:
          console.info('\x1b[36m%s\x1b[0m', formattedMessage);
          break;
        case LogLevel.DEBUG:
          console.debug('\x1b[37m%s\x1b[0m', formattedMessage);
          break;
      }

      // File output
      this.writeToFile(formattedMessage);
    }
  }

  error(message: string, ...args: any[]): void {
    this.log(LogLevel.ERROR, 'error', message, ...args);
  }

  warn(message: string, ...args: any[]): void {
    this.log(LogLevel.WARN, 'warn', message, ...args);
  }

  info(message: string, ...args: any[]): void {
    this.log(LogLevel.INFO, 'info', message, ...args);
  }

  debug(message: string, ...args: any[]): void {
    this.log(LogLevel.DEBUG, 'debug', message, ...args);
  }
}

export const logger = new Logger();
