
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authToken = req.headers.authorization;

  if (!authToken) {
    res.status(401).json({ error: 'Token não informado!' });
    return;
  }

  const [, token] = authToken.split(' ');

  if (!token) {
    res.status(401).json({ error: 'Token inválido!' });
    return;
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    res.status(500).json({ error: 'JWT_SECRET não configurado!' });
    return;
  }

  try {
    const decoded = jwt.verify(token, secret);

    if (typeof decoded === 'string' || typeof decoded.id !== 'number') {
      res.status(401).json({ error: 'Token inválido!' });
      return;
    }

    req.userId = decoded.id;

    next();
  } catch {
    res.status(401).json({ error: 'Token inválido ou expirado!' });
  }
}

export default isAuthenticated;
