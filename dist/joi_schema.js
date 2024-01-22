"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.schema = joi_1.default.object({
    valor: joi_1.default.number()
        .required(),
    numero_cartao: joi_1.default.string()
        .regex(/[0-9]+/)
        .min(12)
        .max(20)
        .required(),
    id_adquirente: joi_1.default.string()
        .regex(/[0-9]+/)
        .min(1)
        .max(20)
        .required(),
    numero_parcelas: joi_1.default.string()
        .regex(/[0-9]+/)
        .min(10)
        .max(60)
        .required(),
    id_bandeira_cartao: joi_1.default.string()
        .regex(/[0-9]+/)
        .min(1)
        .max(10)
        .required(),
    data_venda: joi_1.default.string()
        .pattern(new RegExp('(^0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4}$)')),
});
