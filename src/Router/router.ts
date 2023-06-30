import { Router } from "express";
import { UserController } from "../Controllers/User/userController";
import { AdminController } from "../Controllers/Admin/admincontroller";

const router = Router();

const userController = new UserController();

const adminController = new AdminController();

//Rotas de Usuarios
router.get("/users/:id", userController.listUsers);
router.post("/users/create", userController.createUser);
router.delete('/users/delete/:id', userController.deleteUser);

//Login Usuarios
router.post('/users/login',userController.login);


//Rotas de Admin
router.get('/admin/:id', adminController.listAdmin);
router.post('/admin/create',adminController.createAdmin);
router.delete('/admin/delete/:id', adminController.deleteAdmin);

//Login Admin
router.post('/admin/login',adminController.loginAdmin);

export default router;