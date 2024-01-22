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
function client_connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield db_connect_1.pool.connect();
            const qry = yield db_connect_1.pool.query('SELECT $1::text as message', ['Hello world!']);
            console.log(qry.rows[0].message);
        }
        catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
            }
        }
    });
}
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_connect_1.pool.connect();
    const qry = yield db_connect_1.pool.query('SELECT * FROM vendas');
    res.send(qry);
}));
app.post('/vendas', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_connect_1.pool.connect();
    const qry = yield db_connect_1.pool.query('SELECT $1::text as message', ['Hello world!']);
    res.send(qry);
}));
app.listen(port, () => {
    console.log('Server started at http://localhost:' + port);
});
client_connect();
