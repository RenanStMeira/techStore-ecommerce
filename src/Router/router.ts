import { Router } from "express";
import { UserController } from "../Controllers/User/userController";

const router = Router();

const userController = new UserController();

router.post("/users", userController.createUser);

export default router;