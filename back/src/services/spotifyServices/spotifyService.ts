import spotifyApi from '../../config/spotify-config';
import pool from '../../config/database-connection';

class SpotifyService {

    public readonly scopes = ['user-read-private', 'user-read-email', 'user-top-read','user-read-currently-playing', 'user-read-recently-played'];

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

    async getSpotifyIdByUsername(username: string) {
        const result = await pool.query(
            'SELECT spotify_id FROM fmuser WHERE username = $1',
            [username]
        );
        return result.rows[0]?.spotify_id;
    }

    async getCurrentUserTrack(accessToken: string) {
        if (!accessToken) {
            throw new Error('Token de acesso inválido');
        }
        spotifyApi.setAccessToken(accessToken);
        const data = await spotifyApi.getMyCurrentPlayingTrack();
        return data.body;
    }

}

export default new SpotifyService();