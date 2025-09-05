import spotifyService from '../services/spotifyService';
import { Request, Response } from 'express';
import pool from '../config/database-connection';

export const getSpotifyLogin = (req: Request, res: Response) => {
    try {
        console.log('ENV vars:', {
            clientId: process.env.SPOTIFY_CLIENT_ID ? 'SET' : 'MISSING',
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET ? 'SET' : 'MISSING',
            redirectUri: process.env.SPOTIFY_REDIRECT_URI
        });
        const userId = req.params.userId as string || req.query.username as string;
        const authURL = spotifyService.getAuthorizationUrl(userId);
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
        const spotifyProfile = await spotifyService.getUserProfile(tokens.access_token);
        const updated = await spotifyService.updateAccessToken(spotifyProfile.id, tokens.access_token, tokens.refresh_token, tokens.expires_in, state);
        res.redirect(`http://localhost:3000/user/${state}`);
    } catch (error) {
        console.error('Error handling Spotify callback:', error);
        res.status(500).json({ error: error.message });
    }
}

export const getRecentTracks = async (req: Request, res:Response) => {
    try {
        const username = req.params.userId as string;
        const userSpotifyId = await spotifyService.getUserByUsername(username);
        if (!userSpotifyId) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        const recentTracks = await spotifyService.getRecentTracks(userSpotifyId.access_token);
        res.json(recentTracks);
    } catch(error) {
        console.error('Error fetching recent tracks:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }

}
