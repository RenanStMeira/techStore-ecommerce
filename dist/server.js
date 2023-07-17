"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./Router/router"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(router_1.default);

const port = process.env.PORT || 3000; // Usar a variável de ambiente PORT ou 3000 como padrão

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//# sourceMappingURL=server.js.map