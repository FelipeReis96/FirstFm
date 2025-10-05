import pool from '../config/database-connection';

export class FollowService {

    async followUser(followerId: string, followeeId: string) {
        await pool.query(
            'INSERT INTO follows (follower_id, followee_id) VALUES ($1,$2) RETURNING *',
            [followerId, followeeId]
        );
        return {message: 'User successfully followed'};
    }

    async unfollowUser(followerId: string, followeeId: string) {
        await pool.query(
            'DELETE FROM follows WHERE follower_id = $1 AND followee_id = $2',
            [followerId, followeeId]
        );
        return {message: 'User successfully unfollowed'};
    }

    async getFollows(followerId: string) {
        const result = await pool.query(
            `SELECT username, avatarimage FROM fmuser JOIN follows ON fmuser.id = follows.followee_id 
            WHERE follows.follower_id = $1`,
            [followerId]
        );
        return result.rows;
    }

}
