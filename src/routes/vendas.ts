import { Router, Express, Request, Response, NextFunction, Application } from 'express'
import { pool } from '../db_connect'
import { schema } from "../joi_schema"
export const router = Router()

router.get('/', async (req: Request, res: Response) => {
    try{
           await pool.connect()
           const qry = await pool.query('SELECT * FROM vendas_view')
           res.send(qry)
    }
    catch (err: unknown){
            if (err instanceof Error){
                console.log(err.message)
            }
    }
})

router.post('/', async (req: Request, res: Response) => {
var obj = schema.validate(req.body)
    if(!obj.error){
        obj.value.valor = obj.value.valor.replace(',','.')
        obj.value.data_venda = obj.value.data_venda.toUTCString()
        const qry = await pool.query('INSERT INTO vendas (valor, numero_cartao, id_adquirente, numero_parcelas, id_bandeira_cartao, data_venda) VALUES ('+obj.value.valor+","+obj.value.numero_cartao+","+obj.value.id_adquirente+","+obj.value.numero_parcelas+","+obj.value.id_bandeira_cartao+","+"'"+obj.value.data_venda+"'"+")")
        res.send(qry)
    }
    else{
        res.send(obj.error)
    }
})
