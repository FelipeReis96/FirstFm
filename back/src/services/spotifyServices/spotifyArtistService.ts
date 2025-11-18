import { SpotifyBaseService } from './spotifyBaseService';

export class SpotifyArtistService extends SpotifyBaseService {
    async getTopArtists(accessToken: string) {
        const r = await fetch('https://api.spotify.com/v1/me/top/artists?limit=5', {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        if (!r.ok) throw new Error('spotify api error');
        return r.json();
    }
}