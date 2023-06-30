"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../Controllers/User/userController");
const admincontroller_1 = require("../Controllers/Admin/admincontroller");
const router = (0, express_1.Router)();
const userController = new userController_1.UserController();
const adminController = new admincontroller_1.AdminController();
router.get("/users/:id", userController.listUsers);
router.post("/users/create", userController.createUser);
router.delete('/users/delete/:id', userController.deleteUser);
router.post('/users/login', userController.login);
router.get('/admin/:id', adminController.listAdmin);
router.post('/admin/create', adminController.createAdmin);
router.delete('/admin/delete/:id', adminController.deleteAdmin);
exports.default = router;
//# sourceMappingURL=router.js.map