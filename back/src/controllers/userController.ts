import {Request, Response} from 'express';
import { UserService } from '../services/userServices';
import { AuthenticatedRequest } from '../authRequestInterface';

const userService = new UserService();

export const searchUsers = async (req: Request, res: Response) => {
    const searchTerm = req.query.searchTerm as string;
    try {
        const users = await userService.searchUsers(searchTerm);
        res.json(users);
    } catch (error) {
        res.status(500).json({error: 'An error occurred while searching for users'});
    }
}

export const getisUserAdmin = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const isAdmin = req.user?.role === 'admin';
        console.log('USER FELIPE :', req.user);
        console.log('IS ADMIN FELIPE :', isAdmin);
        res.json({ isAdmin });
    } catch (error) {
        console.error('Error fetching user admin status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getMe = (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
  const { id, username, role, refresh_token } = req.user as any;
  res.json({
    id,
    username,
    role,
    spotifyConnected: !!refresh_token,
  });
};

export const getIdByUsername = async (req: Request, res: Response) => {
    const username = req.params.username as string;
    try {
        const userId = await userService.getIdByUsername(username);
        res.json({ id: userId });
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching user ID' });
    }
}


