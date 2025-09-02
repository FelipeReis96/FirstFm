import spotifyApi from '../config/spotify-config';
import pool from '../config/database-connection';

class SpotifyService {

    private readonly scopes = ['user-read-private', 'user-read-email', 'user-top-read','user-read-currently-playing'];

    getAuthorizationUrl() { 
        return spotifyApi.createAuthorizeURL(this.scopes, 'state');
    }

    async getTokens(code: string) {
        const data = await spotifyApi.authorizationCodeGrant(code);
        return {
            access_token: data.body.access_token,
            refresh_token: data.body.refresh_token,
            expires_in: data.body.expires_in
        };
    }

    async getUserById(userId: string) {
        const result = await pool.query(
            'SELECT * FROM fmuser WHERE id = $1',
            [userId]
        )
        return result.rows[0];

    }

    async getUserProfile(accessToken: string) {
        spotifyApi.setAccessToken(accessToken);
        const data = await spotifyApi.getMe();
        return data.body;
    }

    async insertSpotifyData(userData: any) {
        const result = await pool.query(
            'INSERT INTO fmuser (spotify_id, access_token, refresh_token, token_expires_at) VALUES ($1, $2, $3, $4) RETURNING *',
            [userData.id, userData.access_token, userData.refresh_token, new Date(Date.now() + userData.expires_in * 1000)]
        );
        return result.rows[0];
    }

    async getCurrentUserTrack(accessToken: string) {
        if (!accessToken) {
            throw new Error('Token de acesso inválido');
        }
        spotifyApi.setAccessToken(accessToken);
        const data = await spotifyApi.getMyCurrentPlayingTrack();
        return data.body;
    }

    async upsertAccessToken(userId: string, accessToken: string, refreshToken: string, expiresIn: number) {
        const result = await pool.query(`
            INSERT INTO fmuser (spotify_id, access_token, refresh_token, token_expires_at) 
            VALUES ($1, $2, $3, $4) 
            ON CONFLICT (spotify_id) DO UPDATE 
            SET access_token = $2, refresh_token = $3, token_expires_at = $4 
            RETURNING *`,
            [userId, accessToken, refreshToken, new Date(Date.now() + expiresIn * 1000)]
        );
        return result.rows[0]; 
    }
    

}



export default new SpotifyService();