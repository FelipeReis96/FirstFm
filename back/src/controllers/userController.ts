import {Request, Response} from 'express';
import { UserService } from '../services/userServices';

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
