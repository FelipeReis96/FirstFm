import { SpotifyBaseService } from "./spotifyBaseService";
import pool from '../../config/database-connection';
import spotifyApi from '../../config/spotify-config';

export class SpotifyUserService extends SpotifyBaseService {
    async getUserProfile(accessToken: string) {
        spotifyApi.setAccessToken(accessToken);
        try {
            const data = await spotifyApi.getMe();
            console.log('User Profile Data:', data.body);
            return data.body;
        } catch (error) {
            console.error('Error fetching user profile:', error);
            throw new Error('Failed to fetch user profile');
        }
    }

    async getUserByUsername(username: string) {
        const result = await pool.query(
            'SELECT * FROM fmuser WHERE username = $1',
            [username]
        );
        return result.rows[0];
    }

    async getUserbyEmail(email:string) {
        const result = await pool.query(
        'SELECT * FROM fmuser WHERE email = $1', 
        [email]
        );
        return result.rows[0];
    }

    async updateAccessToken(accessToken: string, refreshToken: string, expiresIn: number, id: string) {
            const result = await pool.query(`
                UPDATE fmuser SET
                    access_token = $1, 
                    refresh_token = $2, 
                    token_expires_at = $3 
                WHERE id = $4
                RETURNING *`,
                [accessToken, refreshToken, new Date(Date.now() + expiresIn * 1000), id]
            );
            
            if (result.rows.length === 0) {
                throw new Error(`Usuário '${id}' não encontrado`);
            }
            
            return result.rows[0]; 
    }

    async refreshAccess(accessToken: string, refreshToken: string, expiresIn: number, username: string) {
        const result = await pool.query(`
            UPDATE fmuser SET
                access_token = $1, 
                refresh_token = $2, 
                token_expires_at = $3 
            WHERE username = $4
            RETURNING *`,
            [accessToken, refreshToken, new Date(Date.now() + expiresIn * 1000), username]
        );
        
        if (result.rows.length === 0) {
            throw new Error(`Usuário '${username}' não encontrado`);
        }
        
        return result.rows[0]; 
    }

    async getValidAccessToken(username: string): Promise<string> {
        const row = await this.getUserByUsername(username); // SELECT ... WHERE username=$1
        if (!row) throw new Error('User not found');

        const access = row.access_token;
        const refresh = row.refresh_token;
        const expiresAt = row.token_expires_at ? new Date(row.token_expires_at).getTime() : 0;

        if (!refresh) throw new Error('User not connected to Spotify');

        // margem de 60s
        if (access && Date.now() < (expiresAt - 60_000)) return access;

        // refresh
        const tokens = await this.refreshAccessToken(refresh); // faça POST /api/token com grant_type=refresh_token
        const newAccess = tokens.access_token as string;
        const newRefresh = (tokens.refresh_token as string) || refresh;
        const newExpiresAt = Date.now() + (tokens.expires_in as number) * 1000;

        await this.updateAccessToken(newAccess, newRefresh, tokens.expires_in, row.id /* id do usuário dono do username */);
        return newAccess;
    }
}