import spotifyService from '../services/spotifyService';
import { Request, Response } from 'express';

export const getSpotifyLogin = (req: Request, res: Response) => {
    try {
        console.log('ENV vars:', {
            clientId: process.env.SPOTIFY_CLIENT_ID ? 'SET' : 'MISSING',
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET ? 'SET' : 'MISSING',
            redirectUri: process.env.SPOTIFY_REDIRECT_URI
        });
        
        const authURL = spotifyService.getAuthorizationUrl();
        res.json({ authUrl: authURL });
    } catch (error) {
        console.error('Error getting Spotify login URL:', error);
        res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
    }
}

export const handleCallback = async (req: Request, res: Response) => {
    try {
        const code = req.query.code as string;
        
        if (!code) {
            return res.redirect('http://localhost:3000/?error=no_code');
        }

        const tokens = await spotifyService.getTokens(code);
        const profile = await spotifyService.getUserProfile(tokens.access_token);
        const data = await spotifyService.upsertAccessToken(profile.id, tokens.access_token, tokens.refresh_token,tokens.expires_in);
        res.redirect(`http://localhost:3000/user/${profile.id}`);
    } catch (error) {
        console.error('Error handling Spotify callback:', error);
        res.redirect('http://localhost:3000/?error=callback_failed');
    }
}
