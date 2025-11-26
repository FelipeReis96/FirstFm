import {FollowService} from "../services/followServices"
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../authRequestInterface";
import pool from "../config/database-connection";

const followService = new FollowService();


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

export const getFollowStatus = async (req: AuthenticatedRequest, res: Response) => {
  const followerId = req.user.id;
  const username = req.params.username;
  const u = await pool.query('SELECT id FROM fmuser WHERE username=$1', [username]);
  if (!u.rowCount) return res.json({ isFollowing: false });
  const followeeId = u.rows[0].id;
  const r = await pool.query(
    'SELECT 1 FROM follows WHERE follower_id=$1 AND followee_id=$2 LIMIT 1',
    [followerId, followeeId]
  );
  res.json({ isFollowing: r.rowCount > 0, followeeId });
}


export const getFollowingByUsername = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    // Busca o id do usuário pelo username
    const userRes = await pool.query("SELECT id FROM fmuser WHERE username = $1", [username]);
    if (userRes.rowCount === 0) return res.status(404).json({ error: "User not found" });
    const userId = userRes.rows[0].id;

    // Busca os usuários que ele segue
    const followsRes = await pool.query(
      `SELECT u.id, u.username, u.avatarimage
       FROM follows f
       JOIN fmuser u ON u.id = f.followee_id
       WHERE f.follower_id = $1`,
      [userId]
    );

    return res.json(followsRes.rows);
  } catch (e) {
    return res.status(500).json({ error: "Internal server error" });
  }
};