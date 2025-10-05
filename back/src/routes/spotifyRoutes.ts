import { Router } from 'express';
import { getSpotifyLogin, handleCallback, getRecentTracks, getTopArtists, getTopTracks} from '../controllers/spotifyController';

const router = Router();

router.get('/login', getSpotifyLogin);
router.get('/callback', handleCallback);
router.get('/recent-tracks/:userId', getRecentTracks);
router.get('/top-artists/:userId', getTopArtists);
router.get('/top-tracks/:userId', getTopTracks);

export default router;