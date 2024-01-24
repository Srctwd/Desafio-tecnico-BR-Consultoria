"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vendas_1 = require("./routes/vendas");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
// routes
app.use('/vendas', vendas_1.router);
// Json validation
app.use((err, req, res, next) => {
    if (err.status == 400)
        return res.send('Invalid JSON\n');
    return next(err);
});
// server start
app.listen(port, () => {
    console.log('Server started at http://localhost:' + port);
});
