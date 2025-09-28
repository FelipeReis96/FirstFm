import SpotifyWebApi from 'spotify-web-api-node';

export class SpotifyBaseService {
    protected createSpotifyApiInstance(accessToken?: string): SpotifyWebApi {
        const spotifyApi = new SpotifyWebApi({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            redirectUri: process.env.SPOTIFY_REDIRECT_URI
        });

        if (accessToken) {
            spotifyApi.setAccessToken(accessToken);
        }

        return spotifyApi;
    }

    protected async refreshAccessToken(refreshToken: string) {
        const spotifyApi = this.createSpotifyApiInstance();
        spotifyApi.setRefreshToken(refreshToken);
        const data = await spotifyApi.refreshAccessToken();
        return {
            access_token: data.body.access_token,
            refresh_token: data.body.refresh_token || refreshToken,
            expires_in: data.body.expires_in
        };
    }
}