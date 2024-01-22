import Joi from "joi";

export const schema = Joi.object({
    valor: Joi.number()
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
        .min(10)
        .max(60)
        .required(),
    
    id_bandeira_cartao: Joi.string()
        .regex(/[0-9]+/)
        .min(1)
        .max(10)
        .required(),

    data_venda: Joi.string()
        .pattern(new RegExp('(^0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4}$)')),
        
})
