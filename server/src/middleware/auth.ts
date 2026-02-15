import type { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt.js';

export interface AuthRequest extends Request {
  userId?: number;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const payload = verifyToken(authHeader.replace('Bearer ', ''));
    req.userId = payload.userId;
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
