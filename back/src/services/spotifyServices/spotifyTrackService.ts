import { SpotifyBaseService } from './spotifyBaseService';
import spotifyApi from '../../config/spotify-config';

export class SpotifyTrackService extends SpotifyBaseService {
    async getTopTracks(accessToken: string) {
        const spotifyApi = this.createSpotifyApiInstance(accessToken);
        try {
            const data = await spotifyApi.getMyTopTracks({ limit: 5 });
            return data.body;
        } catch (error) {
            console.error('Error fetching top tracks from Spotify:', error);
            throw new Error('Failed to fetch top tracks');
        }
    }

    async getRecentTracks(accessToken: string) {
        const spotifyApi = this.createSpotifyApiInstance(accessToken);
        try {
            const data = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 5 });
            return data.body;
        } catch (error) {
            console.error('Error fetching recent tracks from Spotify:', error);
            throw new Error('Failed to fetch recent tracks');
        }
    }
}