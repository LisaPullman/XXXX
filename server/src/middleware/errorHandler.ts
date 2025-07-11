import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export interface ApiError extends Error {
  statusCode?: number;
  isOperational?: boolean;
  errors?: Record<string, string>;
}

export class AppError extends Error implements ApiError {
  public statusCode: number;
  public isOperational: boolean;
  public errors?: Record<string, string>;

  constructor(
    message: string, 
    statusCode: number = 500, 
    isOperational: boolean = true,
    errors?: Record<string, string>
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errors = errors;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, errors?: Record<string, string>) {
    super(message, 400, true, errors);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Access denied') {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Resource conflict') {
    super(message, 409);
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Too many requests') {
    super(message, 429);
  }
}

function handleCastError(error: any): AppError {
  const message = `Invalid ${error.path}: ${error.value}`;
  return new ValidationError(message);
}

function handleDuplicateFieldsError(error: any): AppError {
  const value = error.errmsg.match(/(["'])(\\?.)*?\1/)?.[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new ConflictError(message);
}

function handleValidationError(error: any): AppError {
  const errors: Record<string, string> = {};
  
  Object.values(error.errors).forEach((err: any) => {
    errors[err.path] = err.message;
  });

  return new ValidationError('Invalid input data', errors);
}

function handleJWTError(): AppError {
  return new AuthenticationError('Invalid token. Please log in again!');
}

function handleJWTExpiredError(): AppError {
  return new AuthenticationError('Your token has expired! Please log in again.');
}

function sendErrorDev(err: ApiError, res: Response): void {
  res.status(err.statusCode || 500).json({
    success: false,
    error: err,
    message: err.message,
    stack: err.stack,
    errors: err.errors,
  });
}

function sendErrorProd(err: ApiError, res: Response): void {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  } else {
    // Programming or other unknown error: don't leak error details
    logger.error('ERROR 💥', err);

    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
    });
  }
}

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  let error = { ...err };
  error.message = err.message;

  // Log error
  logger.error(`Error ${err.statusCode || 500}: ${err.message}`, {
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    stack: err.stack,
  });

  // Mongoose bad ObjectId
  if (err.name === 'CastError') error = handleCastError(error);

  // Mongoose duplicate key
  if (err.code === 11000) error = handleDuplicateFieldsError(error);

  // Mongoose validation error
  if (err.name === 'ValidationError') error = handleValidationError(error);

  // JWT error
  if (err.name === 'JsonWebTokenError') error = handleJWTError();

  // JWT expired error
  if (err.name === 'TokenExpiredError') error = handleJWTExpiredError();

  // Send error response
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error, res);
  } else {
    sendErrorProd(error, res);
  }
}

// Async error wrapper
export function catchAsync(fn: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}
