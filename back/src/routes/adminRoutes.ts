import {Router} from "express";
import {deleteUser, getAllUsers} from "../controllers/adminController";
import { authenticateJWT, isAdmin } from "../middleware/jwtAuth";

const router = Router();


router.delete("/user/:id", authenticateJWT, isAdmin, deleteUser);
router.get("/users", authenticateJWT, isAdmin,getAllUsers);
export default router;