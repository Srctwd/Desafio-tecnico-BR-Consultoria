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
const express_1 = __importDefault(require("express"));
const db_connect_1 = require("./db_connect");
const joi_schema_1 = require("./joi_schema");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use((err, req, res, next) => {
    if (err.status == 400)
        return res.send('Invalid JSON\n');
    return next(err);
});
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_connect_1.pool.connect();
    const qry = yield db_connect_1.pool.query('SELECT * FROM vendas');
    res.send(qry);
}));
app.post('/vendas', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const val_obj = joi_schema_1.schema.validate(req.body).error;
    if (!val_obj) {
        var value = req.body.valor.replace(',', '.');
        const qry = yield db_connect_1.pool.query('INSERT INTO vendas (valor, numero_cartao, id_adquirente, numero_parcelas, id_bandeira_cartao, data_venda) VALUES (' + value + "," + req.body.numero_cartao + "," + req.body.id_adquirente + "," + req.body.numero_parcelas + "," + req.body.id_bandeira_cartao + "," + "'" + req.body.data_venda + "'" + ")");
        res.send(qry);
    }
    else {
        res.send(val_obj);
    }
}));
app.listen(port, () => {
    console.log('Server started at http://localhost:' + port);
});
