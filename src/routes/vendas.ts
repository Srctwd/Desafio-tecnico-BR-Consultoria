import { Router, Express, Request, Response, NextFunction, Application } from 'express'
import { pool } from '../db_connect'
import { schema } from "../joi_schema"
export const router = Router()

router.get('/:page', async (req: Request, res: Response) => {
    try{
        await pool.connect()

        //This two variables paginate on the DB level
        var start = Number(req.params.page)*10
        var limit = start+9

        if (start == 10){start=1}
        var amend=''
        var param_number=0

        //Amends the query according to the parameters passed on url
        if (!isNaN(start)){
            if(Object.keys(req.query).length != 0 && 'bandeira' in req.query || 'id_adquirente' in req.query || 'data_venda' in req.query){
                for (var query in req.query){
                    if(!(query == 'bandeira' || query == 'id_adquirente' || query == 'data_venda')){res.send("Parametros inválidos")}
                        param_number = param_number+1
                        amend=amend+query+' = '+'$'+param_number+' AND '
                }
                amend = 'WHERE '+amend.slice(0, -5)
            }
            var qry = 'SELECT * FROM ( SELECT *, ROW_NUMBER() OVER (ORDER BY id_venda) FROM vendas_view '+amend+') as v WHERE ROW_NUMBER BETWEEN '+start+' AND '+limit
            if (param_number == 0){
                var response0 = await pool.query(qry)
                res.send(response0)
            }
            if (param_number == 1){
                var response = await pool.query(qry, [req.query[Object.keys(req.query)[0]]])
                res.send(response)
            }
            if (param_number == 2){
                var response2 = await pool.query(qry, [req.query[Object.keys(req.query)[0]], req.query[Object.keys(req.query)[1]]])
                res.send(response2)
            }
            if (param_number == 3){
                var response3 = await pool.query(qry, [req.query[Object.keys(req.query)[0]], req.query[Object.keys(req.query)[1]], req.query[Object.keys(req.query)[2]]])
                res.send(response3)
            }
    }
            else{
                res.send("Invalid\n")
            }
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
