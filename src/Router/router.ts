import { Router } from "express";
import { UserController } from "../Controllers/User/userController";

const router = Router();

const userController = new UserController();

router.get("/users", userController.listUsers);
router.post("/users/create", userController.createUser);
router.delete('/users/delete', userController.deleteUser);

export default router;