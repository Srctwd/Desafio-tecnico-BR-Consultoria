"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const date_1 = __importDefault(require("@joi/date"));
const joi_1 = __importDefault(require("joi"));
const Joi = joi_1.default.extend(date_1.default);
exports.schema = Joi.object({
    valor: Joi.string()
        .regex(/[+-]?([0-9]*[.])?[0-9]+$/)
        .required(),
    numero_cartao: Joi.string()
        .regex(/[0-9]+/)
        .min(12)
        .max(20)
        .required(),
    id_adquirente: Joi.string()
        .regex(/[0-9]+/)
        .min(1)
        .max(20)
        .required(),
    numero_parcelas: Joi.number()
        .min(1)
        .max(60),
    id_bandeira_cartao: Joi.string()
        .regex(/[0-9]+/)
        .min(1)
        .max(10)
        .valid('50', '4', '51', '52', '53', '54', '55', '36', '38', '301', '305', '65', '64', '622', '6011', '35', '34', '37', '636368', '438935', '504175', '451416', '509048', '509067', '509049', '509069', '509050', '509074', '509068', '509045', '509051', '509046', '509066', '509047', '509042', '509052', '509043', '509064', '509040', '36297', '5067', '4576', '4011', '38', '60')
        .required(),
    data_venda: Joi.date()
        .format('DD/MM/YYYY')
        .required()
});
