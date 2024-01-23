import JoiDate from "@joi/date"
import JoiImport from "joi"
const Joi = JoiImport.extend(JoiDate) as typeof JoiImport

export const schema = Joi.object({
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

    numero_parcelas: Joi.string()
        .regex(/[0-9]+/)
        .max(60),
    
    id_bandeira_cartao: Joi.string()
        .regex(/[0-9]+/)
        .min(1)
        .max(10)
        .required(),

    data_venda: Joi.date()
                .format('DD/MM/YYYY')
                .required()
        
})
