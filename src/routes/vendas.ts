import { Router, Express, Request, Response, NextFunction, Application } from 'express'
import { pool } from '../db_connect'
import { schema } from "../joi_schema"
export const router = Router()

router.get('/:page', async (req: Request, res: Response) => {
    try{
           console.log(Number(req.params.page))
           await pool.connect()
           var start = Number(req.params.page)*10
           var limit = start+9
           if (Number(req.params.page) == 1){start=1}
           if (!isNaN(start)){
           const qry = await pool.query('SELECT * FROM ( SELECT *, ROW_NUMBER() OVER (ORDER BY id_venda) FROM vendas_view ) as v WHERE ROW_NUMBER BETWEEN '+start+' AND '+limit)
           res.send(qry)
           }
           res.send("Invalid\n")
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
