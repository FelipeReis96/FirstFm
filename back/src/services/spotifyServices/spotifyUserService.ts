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

    async updateAccessToken(accessToken: string, refreshToken: string, expiresIn: number, username: string) {
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

    async getValidAccessToken(username: string) {
        const user = await this.getUserByUsername(username);
        if (!user) {
            throw new Error(`User ${username} not found`);
        }
        const now = new Date();
        if (user.token_expires_at > now) {
            return user.access_token;
        }
        console.log("ACCESS TOKEN ", user.access_token);
    
        try {
            const tokens = await this.refreshAccessToken(user.refresh_token);
            const updatedUser = await this.updateAccessToken(tokens.access_token, tokens.refresh_token || user.refresh_token, tokens.expires_in, username);
            return updatedUser.access_token;
        } catch (error) {
            console.error('Error refreshing access token:', error);
            throw new Error(`Failed to refresh access token: ${error.message}`);
        }
    }
}