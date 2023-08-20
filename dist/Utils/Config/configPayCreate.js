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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPayment = exports.run = void 0;
const mercadopago_1 = __importDefault(require("mercadopago"));
mercadopago_1.default.configure({
    access_token: 'TEST-7076964638916012-070221-be12a73bd0650fe626507f653265c262-448062399',
});
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const amount = 1000;
            const description = 'Seu pedido';
            const initPoint = yield createPayment(amount, description);
            console.log('', initPoint);
        }
        catch (error) {
            console.error('Erro no pagamento:', error);
        }
    });
}
exports.run = run;
function createPayment(amount, description) {
    return __awaiter(this, void 0, void 0, function* () {
        const preference = {
            items: [
                {
                    title: description,
                    quantity: 1,
                    currency_id: 'BRL',
                    unit_price: amount,
                },
            ],
            back_urls: {
                success: 'https://api.mercadopago.com',
                failure: 'https://seusite.com/falha',
                pending: 'https://seusite.com/pendente',
            },
            auto_return: 'approved',
        };
        const response = yield mercadopago_1.default.preferences.create(preference);
        console.log(response.body);
        return response.body.init_point;
    });
}
exports.createPayment = createPayment;
run();
//# sourceMappingURL=configPayCreate.js.map