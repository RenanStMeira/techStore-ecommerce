"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateToken(payload) {
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_PASS, { expiresIn: '1h' });
    return token;
}
exports.generateToken = generateToken;
function verifyToken(token) {
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_PASS);
    return decoded;
}
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwtUtils.js.map