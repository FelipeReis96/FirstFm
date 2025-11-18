import {Router} from "express"
import {followUser, getFollowing, unfollowUser, getFollowStatus} from "../controllers/followController"
import { authenticateJWT } from "../middleware/jwtAuth";
const router = Router();

router.post('/follow', authenticateJWT,followUser);
router.get('/following', authenticateJWT, getFollowing);
router.delete('/unfollow', authenticateJWT, unfollowUser);
router.get('/status/:username', authenticateJWT, getFollowStatus);

export default router;