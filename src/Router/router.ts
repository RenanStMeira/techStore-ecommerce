import { Router } from "express";
import { UserController } from "../Controllers/User/userController";
import { AdminController } from "../Controllers/Admin/admincontroller";

const router = Router();

const userController = new UserController();

const adminController = new AdminController();

//Rotas de Usuarios
router.get("/users", userController.listUsers);
router.post("/users/create", userController.createUser);
router.delete('/users/delete', userController.deleteUser);

//Rotas de Admin
router.post('/admin',adminController.createAdmin);


export default router;