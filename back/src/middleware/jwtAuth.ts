import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import pool from '../config/database-connection';
import { AuthenticatedRequest } from "../authRequestInterface";

export const authenticateJWT = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'] as string | undefined;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        const result = await pool.query(
            'SELECT id, username, role FROM fmuser WHERE id = $1',
            [decoded.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        req.user = result.rows[0];
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

export const checkRole = (requiredRoles: string[]) => {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        try {
            const user = req.user;
            if (!user || !user.id) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            // Usar o role que já foi buscado no authenticateJWT
            if (user.role && requiredRoles.includes(user.role)) {
                return next();
            }
            
            // Se por algum motivo não tiver o role, buscar do banco (fallback)
            if (!user.role) {
                const result = await pool.query(
                    'SELECT role FROM fmuser WHERE id = $1',
                    [user.id]
                );
                
                if (result.rows.length === 0) {
                    return res.status(404).json({ error: 'User not found' });
                }
                
                user.role = result.rows[0].role;
                
                if (requiredRoles.includes(user.role)) {
                    return next();
                }
            }
            
            // Se chegou aqui, não tem permissão
            res.status(403).json({error: 'Do not have permission'});
        } catch (error) {
            console.error('Error checking user role:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export const isAdmin = checkRole(['admin']);