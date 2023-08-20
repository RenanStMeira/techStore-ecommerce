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
exports.AdminController = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
class AdminController {
    createAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, isAdmin } = req.body;
            const hash = yield bcrypt_1.default.hash(password, 10);
            try {
                if (!isAdmin) {
                    throw new Error('Sem permição');
                }
                const newAdmin = yield prisma.admin.create({
                    data: {
                        name,
                        email,
                        password: hash,
                        isAdmin: true,
                    }
                });
                const { password: _ } = newAdmin, user = __rest(newAdmin, ["password"]);
                return res.json(newAdmin);
            }
            catch (err) {
                res.status(400).json({ message: `Você não tem autorização para criar este usuário` });
            }
        });
    }
    ;
    listAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const admin = yield prisma.admin.findUnique({
                    where: {
                        id: id,
                    }
                });
                if (admin) {
                    res.json(admin);
                }
                else {
                    res.status(404).json({ message: 'Admin não encontrado' });
                }
            }
            catch (_a) {
                res.status(400).json({ message: 'Erro do Servidor Interno' });
            }
        });
    }
    deleteAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield prisma.admin.delete({
                    where: {
                        id: String(id),
                    }
                });
                res.status(201).json({ message: 'Usuario deletado com sucesso' });
            }
            catch (_a) {
                res.status(400).json({ message: 'Usuario nao encontrado' });
            }
        });
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=adminController.js.map