import { SpotifyBaseService } from './spotifyBaseService';

export class SpotifyArtistService extends SpotifyBaseService {
    async getTopArtists(accessToken: string) {
        const spotifyApi = this.createSpotifyApiInstance(accessToken); 
        try {
            const data = await spotifyApi.getMyTopArtists({ limit: 5 });
            return data.body;
        } catch (error) {
            console.error('Error fetching top artists:', error);
            throw new Error('Failed to fetch top artists');
        }
    }
}