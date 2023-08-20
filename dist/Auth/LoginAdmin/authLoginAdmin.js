"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginAdmincontroller = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtUtils_1 = require("../../Middlewares/jwtUtils");
const prismaService_1 = require("../../Service/Prisma/prismaService");
class LoginAdmincontroller {
    loginAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const admins = yield prismaService_1.prisma.admin.findMany({
                    where: { email: { equals: email } },
                    select: { id: true, name: true, email: true, password: true, isAdmin: true },
                });
                if (!admins || admins.length === 0) {
                    return res.status(404).json({ message: 'Admin não encontrado' });
                }
                const admin = admins[0];
                const isPasswordValid = yield bcrypt_1.default.compare(password, admin.password);
                if (!isPasswordValid) {
                    return res.status(401).json({ message: 'Senha incorreta' });
                }
                const token = (0, jwtUtils_1.generateToken)({ id: admin.id });
                const { password: _ } = admin, adminlogin = __rest(admin, ["password"]);
                return res.json({
                    admin: adminlogin,
                    token: token,
                });
            }
            catch (error) {
                console.error('Erro ao fazer login do admin:', error);
                res.status(401).json({ message: 'Erro ao fazer login do admin' });
            }
        });
    }
}
exports.LoginAdmincontroller = LoginAdmincontroller;
//# sourceMappingURL=authLoginAdmin.js.map