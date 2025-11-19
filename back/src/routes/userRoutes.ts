import {Router} from "express"
import {getisUserAdmin, searchUsers, getMe, getIdByUsername } from "../controllers/userController"
import { authenticateJWT, checkRole,isAdmin} from "../middleware/jwtAuth";

const router = Router();

router.get("/search", searchUsers);
router.get('/me', authenticateJWT, getMe);
router.get('/getId/:username', getIdByUsername);

export default router;