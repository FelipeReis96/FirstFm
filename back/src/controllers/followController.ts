import {FollowService} from "../services/followServices"
import { Request, Response } from "express";

const followService = new FollowService();

interface AuthenticatedRequest extends Request {
  user: { id: string };
}

export const followUser = async (req: AuthenticatedRequest, res: Response) => {
    const followeeId = req.body.followeeId as string;
    const followerId = req.user.id as string;
    try {
        const result = await followService.followUser(followerId, followeeId);
        res.json(result);
    } catch (error) {
        res.status(500).json({error: 'An error occurred while following the user'});
    }
}

export const getFollowing = async (req: AuthenticatedRequest, res: Response) => {
    const followerId = req.user.id as string;
    console.log('Follower ID from token:', followerId); // Log para verificar o ID do seguidor
    try {
        const result = await followService.getFollows(followerId);
        res.json(result);
    } catch (error) {
        res.status(500).json({error: 'An error occurred while fetching following list'});
    }
}

export const unfollowUser = async (req: AuthenticatedRequest, res: Response) => {
    const followerId = req.user.id as string;
    const followeeId = req.body.followeeId as string;
    try {
        const result  = await followService.unfollowUser(followerId, followeeId);
        res.json(result);
    } catch(error) {
        throw error;
    }
}