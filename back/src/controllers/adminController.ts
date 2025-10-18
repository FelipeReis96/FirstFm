import {AdminService} from  '../services/adminServices';
import { Request, Response } from 'express';

const adminService = new AdminService();

export const deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const deletedUser = await adminService.deleteUser(id);
        return res.json({message: 'User deleted successfully', deletedUser});
    } catch (error) {
        return res.status(500).json({message: 'Error deleting user', error});
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await adminService.getAllUsers();
        return res.json(users);

    } catch (error) {
        return res.status(500).json({message: 'Error retrieving users', error});
    }
}

