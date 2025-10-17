import pool from '../config/database-connection';

export class UserService {
    async searchUsers(searchTerm: string) {
        const result = await pool.query(
            'SELECT username, avatarimage FROM fmuser WHERE username ILIKE $1',
            [`%${searchTerm}%`]
        );
        return result.rows;
    }
}