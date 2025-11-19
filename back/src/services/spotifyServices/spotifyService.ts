import spotifyApi from '../../config/spotify-config';
import pool from '../../config/database-connection';
import querystring from 'querystring';

class SpotifyService {

    public readonly scopes = ['user-read-private', 'user-read-email', 'user-top-read','user-read-currently-playing', 'user-read-recently-played'];

    getAuthorizationUrl(state?: string) { 
        const username = state || 'default_state';
        const url = 'https://accounts.spotify.com/authorize?' + 
        querystring.stringify({
            response_type: 'code',
            client_id: process.env.SPOTIFY_CLIENT_ID,
            scope: this.scopes.join(' '),
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
            state: username,
            show_dialog: true,
        });
        return url;
    }


    async getTokens(code: string) {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(
                `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
                ).toString('base64'),
            },
            body: querystring.stringify({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
            })
        })
        const data = await response.json();
        return {
            access_token: data.access_token,
            refresh_token: data.refresh_token,
            expires_in: data.expires_in
        };
    }



    async getCurrentUserTrack(accessToken: string) {
        if (!accessToken) throw new Error('Token de acesso inválido');
        const r = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (r.status === 204) return null;
        return r.json();
    }

}

export default new SpotifyService();