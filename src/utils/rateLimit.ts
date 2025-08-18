import { Request, Response, NextFunction } from 'express';

// Simple in-memory rate limiter (IP based) for demo purposes only
const hits: Record<string, { count: number; ts: number }> = {};

interface Options {
  windowMs: number; // time window in ms
  max: number; // max requests per window
}

export function rateLimit(options: Options) {
  const { windowMs, max } = options;
  return function (req: Request, res: Response, next: NextFunction) {
    const key = req.ip || 'global';
    const now = Date.now();
    const entry = hits[key] || { count: 0, ts: now };
    if (now - entry.ts > windowMs) {
      entry.count = 0;
      entry.ts = now;
    }
    entry.count += 1;
    hits[key] = entry;
    if (entry.count > max) {
      return res.status(429).json({ error: 'Too many requests' });
    }
    next();
  };
}
