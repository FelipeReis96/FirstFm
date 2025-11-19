import { Router } from 'express';
import { getSpotifyLogin, handleCallback, getRecentTracks, getTopArtists, getTopTracks} from '../controllers/spotifyController';

const router = Router();

router.get('/login', getSpotifyLogin);
router.get('/callback', handleCallback);
router.get('/recent-tracks/:username', getRecentTracks);
router.get('/top-artists/:username', getTopArtists);
router.get('/top-tracks/:username', getTopTracks);

export default router;