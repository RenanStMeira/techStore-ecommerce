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
exports.UserController = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
class UserController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            const hash = yield bcrypt_1.default.hash(password, 10);
            try {
                const newUser = yield prisma.user.create({
                    data: {
                        name,
                        email,
                        password: hash,
                    },
                });
                const { password: _ } = newUser, user = __rest(newUser, ["password"]);
                res.status(201).json({ message: 'Usuario criado com sucesso', user });
            }
            catch (err) {
                res.status(500).json({ message: 'Erro ao criar usuario' });
            }
        });
    }
    ;
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const users = yield prisma.user.findUnique({
                    where: { email },
                });
                if (!users) {
                    return res.status(404).json({ message: "Usuario não encontrado" });
                }
                const isPasswordValid = yield bcrypt_1.default.compare(password, users.password);
                if (!isPasswordValid) {
                    return res.status(401).json({ message: 'Senha incorreta' });
                }
                const token = jsonwebtoken_1.default.sign({ id: users.id }, process.env.JWT_PASS, { expiresIn: '1h' });
                const { password: _ } = users, userLogin = __rest(users, ["password"]);
                return res.json({
                    user: userLogin,
                    token: token,
                });
            }
            catch (err) {
                console.error('Erro ao fazer login:', err);
                res.status(500).json({ message: 'Erro ao fazer login' });
            }
        });
    }
    listUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const users = yield prisma.user.findUnique({
                    where: {
                        id: id,
                    }
                });
                if (users) {
                    res.json(users);
                }
                else {
                    res.status(404).json({ message: 'Usuario não encontrado' });
                }
            }
            catch (_a) {
                res.status(500).json({ message: 'Erro no Servidor Interno' });
            }
        });
    }
    ;
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield prisma.user.delete({
                    where: {
                        id: String(id),
                    }
                });
                res.status(200).json({ message: 'Usuario deletado com sucesso deleted succesfully' });
            }
            catch (err) {
                res.status(500).json({ message: 'Erro ao deletar usuario' });
            }
        });
    }
}
exports.UserController = UserController;
;
//# sourceMappingURL=userController.js.map