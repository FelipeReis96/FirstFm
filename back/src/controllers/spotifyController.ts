import spotifyService from '../services/spotifyServices/spotifyService';
import { Request, Response } from 'express';
import { SpotifyUserService } from '../services/spotifyServices/spotifyUserService';
import { SpotifyTrackService } from '../services/spotifyServices/spotifyTrackService';
import { SpotifyArtistService } from '../services/spotifyServices/spotifyArtistService';


const userService = new SpotifyUserService();
const trackService = new SpotifyTrackService();
const artistService = new SpotifyArtistService();

export const getSpotifyLogin = (req: Request, res: Response) => {
    try {
        const username = req.params.username as string || req.query.username as string;
        const authURL = spotifyService.getAuthorizationUrl(username);
        res.json({ authUrl: authURL });
    } catch (error) {
        console.error('Error getting Spotify login URL:', error);
        res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
    }
}

export const handleCallback = async (req: Request, res: Response) => {
    try {
        const code = req.query.code as string;
        const state = req.query.state as string;
        
        console.log('State recebido:', state);
        
        if (!code) {
            return res.redirect('http://localhost:3000/?error=no_code');
        }

        const tokens = await spotifyService.getTokens(code);
        const updated = await userService.refreshAccess(tokens.access_token, tokens.refresh_token, tokens.expires_in, state);
        res.redirect(`http://localhost:3000/user/${state}`);
    } catch (error) {
        console.error('Error handling Spotify callback:', error);
        res.status(500).json({ error: error.message });
    }
}

export const getRecentTracks = async (req: Request, res:Response) => {
    try {
        const username = req.params.username as string;
        const accessToken = await userService.getValidAccessToken(username);
        const recentTracks = await trackService.getRecentTracks(accessToken);
        res.json(recentTracks);
    } catch(error) {
        console.error('Error fetching recent tracks:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }

}

export const getTopArtists = async (req: Request, res:Response) => {
    try {
        const username = req.params.username as string;
        const accessToken = await userService.getValidAccessToken(username);
        const topArtists = await artistService.getTopArtists(accessToken);
        res.json(topArtists);
    } catch(error) {
        console.error('Error fetching top artists:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}

export const getTopTracks = async (req: Request, res:Response) => {
    try {
        const username = req.params.username as string;
        const accessToken = await userService.getValidAccessToken(username);
        const topTracks = await trackService.getTopTracks(accessToken);
        res.json(topTracks);
    } catch(error) {
        console.error('Error fetching top tracks:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}