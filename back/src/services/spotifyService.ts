import spotifyApi from '../config/spotify-config';
import pool from '../config/database-connection';

class SpotifyService {

    private readonly scopes = ['user-read-private', 'user-read-email', 'user-top-read','user-read-currently-playing', 'user-read-recently-played'];

    getAuthorizationUrl(state?: string) { 
        const username = state || 'default_state';
        return spotifyApi.createAuthorizeURL(this.scopes, username);
    }

    async getMyUsername(username: string) {
        const result = await pool.query(
            'SELECT * FROM fmuser WHERE username = $1',
            [username]
        );
        return result.rows[0];
    }

    async getTokens(code: string) {
        const data = await spotifyApi.authorizationCodeGrant(code);
        return {
            access_token: data.body.access_token,
            refresh_token: data.body.refresh_token,
            expires_in: data.body.expires_in
        };
    }

    async getUserBySpotifyId(userId: string) {
        const result = await pool.query(
            'SELECT * FROM fmuser WHERE spotify_id = $1',
            [userId]
        )
        return result.rows[0];
    }

    async getUserByUsername(username: string) {
        const result = await pool.query(
            'SELECT * FROM fmuser WHERE username = $1',
            [username]
        );
        return result.rows[0];
    }

    async getSpotifyIdByUsername(username: string) {
        const result = await pool.query(
            'SELECT spotify_id FROM fmuser WHERE username = $1',
            [username]
        );
        return result.rows[0]?.spotify_id;
    }

    async getUserProfile(accessToken: string) {
        spotifyApi.setAccessToken(accessToken);
        const data = await spotifyApi.getMe();
        return data.body;
    }

    async insertSpotifyData(userData: any) {
        const result = await pool.query(
            'UPDATE fmuser SET spotify_id = $1, access_token = $2, refresh_token = $3, token_expires_at = $4 WHERE id = $5 RETURNING *',
            [userData.id, userData.access_token, userData.refresh_token, new Date(Date.now() + userData.expires_in * 1000), userData.id]
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

    async updateAccessToken(spotifyId: string, accessToken: string, refreshToken: string, expiresIn: number, username: string) {
        const result = await pool.query(`
            UPDATE fmuser SET
                access_token = $1, 
                refresh_token = $2, 
                token_expires_at = $3, 
                spotify_id = $4
            WHERE username = $5
            RETURNING *`,
            [accessToken, refreshToken, new Date(Date.now() + expiresIn * 1000), spotifyId, username]
        );
        
        if (result.rows.length === 0) {
            throw new Error(`Usuário '${username}' não encontrado`);
        }
        
        return result.rows[0]; 
    }
    
    async getRecentTracks(accessToken: string) {
        if (!accessToken) {
            throw new Error('Invalid access token');
        }
        spotifyApi.setAccessToken(accessToken);
        const data  = await spotifyApi.getMyRecentlyPlayedTracks({limit : 5});
    return data.body;
    }

    async refreshAccessToken(refreshToken: string) {
        spotifyApi.setRefreshToken(refreshToken);
        const data = await spotifyApi.refreshAccessToken();
        return {
            access_token: data.body.access_token,
            expires_in: data.body.expires_in
        };
    }

    async getTopArtists(accessToken: string) {
        if (!accessToken) {
            throw new Error('Invalid access token');
        }
        spotifyApi.setAccessToken(accessToken);
        const data = await spotifyApi.getMyTopArtists({limit: 5});
        return data.body;
    }

    async getTopTracks(accessToken: string) {
        if (!accessToken) {
            throw new Error('Invalid access token');
        }
        spotifyApi.setAccessToken(accessToken);
        const data = await spotifyApi.getMyTopTracks({limit: 5});
        return data.body;
    }

}

export default new SpotifyService();