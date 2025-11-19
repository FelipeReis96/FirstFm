import { SpotifyBaseService } from './spotifyBaseService';

export class SpotifyTrackService extends SpotifyBaseService {
    async getTopTracks(accessToken: string) {
        const r = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=5', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (!r.ok) throw new Error('spotify api error');
        return r.json();
    }

    async getRecentTracks(accessToken: string) {
        const r = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=5', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (r.status === 204) return { items: [] };
        if (!r.ok) throw new Error('spotify api error');
        return r.json();
    }
}