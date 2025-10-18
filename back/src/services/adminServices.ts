import pool from '../config/database-connection';

export class AdminService {
    async deleteUser(id : string) {
        const deletedUser = await pool.query(
            'DELETE FROM fmuser WHERE id = $1',
            [id]
        );
        return deletedUser;
    }

    async getAllUsers() {
        const result = await pool.query(
            'SELECT id, username, email, role FROM fmuser',
        );
        return result.rows;
    }
}