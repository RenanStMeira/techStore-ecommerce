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
exports.salesController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class salesController {
    historySale(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.params;
            try {
                const all = yield prisma.sales.findMany({ where: { user_id: userId } });
                if (all) {
                    return res.status(201).json(all);
                }
                else {
                    return res.status(404).json({ message: "Id inválido" });
                }
            }
            catch (error) {
                console.log(error);
                res.status(404).json({ message: 'Internal error' });
            }
        });
    }
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            try {
                const one = yield prisma.sales.findFirst({ where: { id } });
                if (one) {
                    return res.status(200).json(one);
                }
                else {
                    return res.status(404).json({ message: "Id inválido" });
                }
            }
            catch (error) {
                console.log(error);
                res.status(404).json({ message: 'Internal error' });
            }
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const all = prisma.sales.findMany();
                return res.status(200).json(all);
            }
            catch (error) {
                console.log(error);
                res.status(404).json({ message: 'Internal error' });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id, product_id, amount } = req.body;
            try {
                const newSale = yield prisma.sales.create({
                    data: {
                        user_id,
                        amount
                    }
                });
                for (let productId of product_id) {
                    yield prisma.sales.update({
                        where: { id: newSale.id },
                        data: { product_id: { connect: { id: productId } } }
                    });
                }
                return res.status(201).json({ message: "Sale cadastrada com sucesso" });
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: "Erro ao cadastrar sale" });
            }
        });
    }
    updateSale(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { product_id, amount } = req.body;
            try {
                const Sale = yield prisma.sales.findFirst({ where: { id } });
                if (Sale) {
                    for (let productId of product_id) {
                        yield prisma.sales.update({
                            where: { id: id },
                            data: { product_id: { connect: { id: productId } },
                                amount
                            }
                        });
                    }
                    return res.status(201).json({ message: "Sale atualizada com sucesso" });
                }
                else {
                    return res.status(404).json({ message: "Id inválido" });
                }
            }
            catch (error) {
                console.log(error);
                res.status(404).json({ message: "Erro ao atualizar sale" });
            }
        });
    }
    deleteSale(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const Sale = yield prisma.sales.findFirst({ where: { id } });
                if (Sale) {
                    yield prisma.sales.delete({ where: { id } });
                    return res.status(200).json({ message: "Sale excluida com sucesso " });
                }
                else {
                    return res.status(404).json({ message: "Id inválido" });
                }
            }
            catch (error) {
                console.log(error);
                return res.json(404).json({ message: 'Erro ao excluir usuario' });
            }
        });
    }
}
exports.salesController = salesController;
//# sourceMappingURL=salesControllers.js.map