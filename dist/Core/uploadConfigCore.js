"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadMulter = void 0;
const multer_1 = __importDefault(require("multer"));
class UploadMulter {
    storage(destiny) {
        return multer_1.default.diskStorage({
            destination: destiny,
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            },
        });
    }
    guard(destiny) {
        return (0, multer_1.default)({ storage: this.storage(destiny) }).single('file');
    }
}
exports.UploadMulter = UploadMulter;
//# sourceMappingURL=uploadConfigCore.js.map