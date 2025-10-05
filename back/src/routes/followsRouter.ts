import {Router} from "express"
import {followUser, getFollowing, unfollowUser} from "../controllers/followController"
import { authenticateJWT } from "../middleware/jwtAuth";
const router = Router();

router.post('/follow', authenticateJWT,followUser);
router.get('/following', authenticateJWT, getFollowing);
router.post('/unfollow', authenticateJWT, unfollowUser);

export default router;