import { Router } from "express";
 import {createUser }from "../controllers/userController";
const router = Router();

//router.get("/users", getUsers);

router.post("/user", createUser);



// router.put("/users/:id", updateUser);

// router.delete("/users/:id", deleteUser);

export default router;