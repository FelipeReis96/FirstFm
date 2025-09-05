import { Router } from 'express';
import { getSpotifyLogin, handleCallback, getRecentTracks} from '../controllers/spotifyController';


const router = Router();

router.get('/login', getSpotifyLogin);
router.get('/callback', handleCallback);
router.get('/recent-tracks/:userId', getRecentTracks);

export default router;