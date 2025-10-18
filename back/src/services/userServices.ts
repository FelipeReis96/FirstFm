import pool from '../config/database-connection';

export class UserService {
    async searchUsers(searchTerm: string) {
        const result = await pool.query(
            'SELECT username, avatarimage FROM fmuser WHERE username ILIKE $1',
            [`%${searchTerm}%`]
        );
        return result.rows;
    }

    async isUserAdmin(userId: string): Promise<boolean> {
        const result = await pool.query(
            'SELECT role FROM fmuser WHERE id = $1',
            [userId]
        );
        if (result.rows.length === 0) {
            throw new Error('User not found');
        }
        return result.rows[0].role === 'admin';
    }
}