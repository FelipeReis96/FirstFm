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
        console.log('Generated URL:', authURL);
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
            return res.status(400).json({ error: 'Código de autorização não fornecido' });
        }

        const tokens = await spotifyService.getTokens(code);
        
        res.json({
            success: true,
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token,
            expires_in: tokens.expires_in
        }); // AGORA REDIRECIONAR PARA O FRONTEND COM OS TOKENS COMO PARAMETROS
    } catch (error) {
        console.error('Error handling Spotify callback:', error);
        res.status(500).json({ 
            error: 'Erro interno do servidor', 
            details: error.message 
        });
    }
}