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
        if (!refreshToken) throw new Error('Missing refresh_token');

        const resp = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization':
                    'Basic ' + Buffer.from(
                        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
                    ).toString('base64'),
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            }),
        });

        if (!resp.ok) {
            const err = await resp.json().catch(() => ({}));
            throw new Error(`Failed to refresh token: ${resp.status} ${JSON.stringify(err)}`);
        }

        const data = await resp.json();
        return {
            access_token: data.access_token as string,
            refresh_token: (data.refresh_token as string | undefined) || refreshToken,
            expires_in: data.expires_in as number,
        };
    }
}