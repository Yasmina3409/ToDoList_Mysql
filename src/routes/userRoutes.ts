import { Router } from "express";
import { createUser, connectUser, getUser } from "../controllers/userControllers";
import { authenticateToken } from "../authJWT";
const router = Router();


router.post("/signup", createUser);
router.post("/login", connectUser);
      
router.post("/displayUser", authenticateToken, getUser);

// router.put("/users/:id", updateUser);

// router.delete("/users/:id", deleteUser);

export default router;