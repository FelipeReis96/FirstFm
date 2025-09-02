import { Router } from 'express';
import { getSpotifyLogin, handleCallback} from '../controllers/spotifyController';


const router = Router();

router.get('/login', getSpotifyLogin);
router.get('/callback', handleCallback);

export default router;