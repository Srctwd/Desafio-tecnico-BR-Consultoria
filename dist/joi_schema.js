"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.schema = joi_1.default.object({
    valor: joi_1.default.string()
        .regex(/[+-]?([0-9]*[.])?[0-9]+/)
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
        .max(60),
    id_bandeira_cartao: joi_1.default.string()
        .regex(/[0-9]+/)
        .min(1)
        .max(10)
        .required(),
    data_venda: joi_1.default.date().required()
});
