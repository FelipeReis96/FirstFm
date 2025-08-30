import spotifyApi from '../config/spotify-config';

class SpotifyService {

    private readonly scopes = ['user-read-private', 'user-read-email', 'user-top-read'];

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


}

export default new SpotifyService();