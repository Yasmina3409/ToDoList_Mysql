import { Router } from "express";
 import {createTask, getTask, getTaskCompleted, updateTask }from "../controllers/taskControllers";
import authenticateToken from "../authJWT";
const router = Router();

//router.get("/users", getUsers);
router.use(authenticateToken);
router.post("/addtask", createTask);
router.post("/displayList/:id", getTask);

router.post("/displayListComplited/:id", getTaskCompleted);
router.put("/updateCompleted/:id", updateTask);

// router.put("/users/:id", updateUser);

// router.delete("/users/:id", deleteUser);

export default router;