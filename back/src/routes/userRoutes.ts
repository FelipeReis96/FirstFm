import {Router} from "express"
import {searchUsers} from "../controllers/userController"
import { authenticateJWT, checkRole,isAdmin} from "../middleware/jwtAuth";

const router = Router();

router.get("/search", searchUsers);

export default router;