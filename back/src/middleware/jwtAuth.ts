import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  user: { id: string };
}

export const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        req.user = { id: decoded.id };
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}