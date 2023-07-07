import { Router } from "express";
import { UserController } from "../Controllers/User/userController";
import { AdminController } from "../Controllers/Admin/adminController";
import { LoginController } from "../Auth/LoginUsers/authLoginUser";
import { LoginAdmincontroller } from "../Auth/LoginAdmin/authLoginAdmin";
// import { PaymentController } from '../Service/ControllerPay/serviceControllerPay'
import { ProductController } from "../Controllers/Products/productController";
import { UploadMulter } from "../Core/uploadConfigCore";

const router = Router();

const userController = new UserController();

const adminController = new AdminController();

const loginUsercontroller = new LoginController();

const loginAdminController = new LoginAdmincontroller();

const uploadMulter = new UploadMulter();

const productController = new ProductController();

// const paymentController = new PaymentController();


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

//Produtos
router.get('/product/:id',productController.findAll);
router.post('/product/created',productController.create);
router.delete('/product/created',productController.delete);


//upload de imagens
router.post('/upload/image', uploadMulter.guard('uploads/image'), productController.upload);


//Pagamento Mercado Pago
// router.post('/pay',paymentController.create);


export default router;