import { Router } from "express";
import { UserController } from "../Controllers/User/userController";
import { AdminController } from "../Controllers/Admin/adminController";
import { LoginController } from "../Auth/LoginUsers/authLoginUser";
import { LoginAdmincontroller } from "../Auth/LoginAdmin/authLoginAdmin";
import { PaymentController } from '../Service/ControllerPay/serviceControllerPay'

const router = Router();

const userController = new UserController();

const adminController = new AdminController();

const loginUsercontroller = new LoginController();

const loginAdminController = new LoginAdmincontroller();

const paymentController = new PaymentController();


//Rotas de Usuarios
router.get("/users/:id", userController.listUsers);
router.post("/users/create", userController.createUser);
router.delete('/users/delete/:id', userController.deleteUser);

//Login Usuarios
router.post('/users/login', loginUsercontroller.login);


//Rotas de Admin
router.get('/admin/:id', adminController.listAdmin);
router.post('/admin/create',adminController.createAdmin);
router.delete('/admin/delete/:id', adminController.deleteAdmin);

//Login Admin
router.post('/admin/login',loginAdminController.loginAdmin);

//Pagamento Mercado Pago
router.post('/pay',paymentController.create);


export default router;