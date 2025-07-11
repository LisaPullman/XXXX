import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { RateLimitError } from './errorHandler';
import { logger } from '../utils/logger';

// General rate limiter
const rateLimiter = new RateLimiterMemory({
  keyGenerator: (req: Request) => req.ip,
  points: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // Number of requests
  duration: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900'), // Per 15 minutes (900 seconds)
});

// Strict rate limiter for auth endpoints
const authRateLimiter = new RateLimiterMemory({
  keyGenerator: (req: Request) => req.ip,
  points: 5, // Number of requests
  duration: 900, // Per 15 minutes
  blockDuration: 900, // Block for 15 minutes
});

// Login rate limiter (more restrictive)
const loginRateLimiter = new RateLimiterMemory({
  keyGenerator: (req: Request) => `${req.ip}_${req.body.email || 'unknown'}`,
  points: 3, // Number of attempts
  duration: 900, // Per 15 minutes
  blockDuration: 1800, // Block for 30 minutes
});

export function createRateLimiter(limiter: RateLimiterMemory) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await limiter.consume(req.ip);
      next();
    } catch (rejRes: any) {
      const secs = Math.round(rejRes.msBeforeNext / 1000) || 1;
      
      logger.warn(`Rate limit exceeded for IP: ${req.ip}`, {
        url: req.originalUrl,
        method: req.method,
        userAgent: req.get('User-Agent'),
        remainingPoints: rejRes.remainingPoints,
        msBeforeNext: rejRes.msBeforeNext,
      });

      res.set('Retry-After', String(secs));
      
      throw new RateLimitError(
        `Too many requests. Please try again in ${secs} seconds.`
      );
    }
  };
}

// Export different rate limiters
export const generalRateLimiter = createRateLimiter(rateLimiter);
export const authRateLimit = createRateLimiter(authRateLimiter);
export const loginRateLimit = createRateLimiter(loginRateLimiter);

// Default export for general use
export { generalRateLimiter as rateLimiter };
