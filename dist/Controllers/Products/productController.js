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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ProductController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, price, brand, model, description, image } = req.body;
            try {
                const createdProduct = yield prisma.product.create({
                    data: {
                        name,
                        price,
                        brand,
                        model,
                        description,
                        image,
                    },
                });
                return res.status(201).json({ message: "Produto cadastrado com sucesso", product: createdProduct });
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: "Erro ao cadastrar produto" });
            }
        });
    }
    upload(req, res) {
        return res.json({ message: 'Imagem cadastrada com sucesso' });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const product = yield prisma.product.findMany({
                    where: {
                        id: id,
                    },
                });
                if (product) {
                    return res.json(product);
                }
                else {
                    return res.status(404).json({ message: "Product not found" });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(400).json({ message: "Error finding product" });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield prisma.product.delete({
                    where: {
                        id: id
                    },
                });
                return res.status(200).json({ message: "Produto excluido com sucesso " });
            }
            catch (err) {
                return res.json(400).json({ message: 'Erro ao excluir usuario', err });
            }
        });
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=productController.js.map