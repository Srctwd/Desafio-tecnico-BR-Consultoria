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
const pg_1 = require("pg");
const client = new pg_1.Client();
function client_connect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const qry = yield client.query('SELECT $1::text as message', ['Hello world!']);
            console.log(qry.rows[0].message);
            yield client.end();
        }
        catch (_a) {
            console.log("client not connected");
        }
    });
}
client_connect();
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("466");
}));
app.listen(port, () => {
    console.log('Server started at http://localhost:' + port);
});
