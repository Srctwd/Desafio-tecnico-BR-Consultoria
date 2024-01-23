import express, { Express, Request, Response, Application } from 'express';
import { pool } from './db_connect'
import { schema } from "./joi_schema"

const app: Application = express()
const port = 3000
app.use(express.json())

app.get('/', async (req: Request, res: Response) => {
    await pool.connect()
    const qry = await pool.query('SELECT * FROM vendas')
    res.send(qry)
})

app.post('/vendas', async (req: Request, res: Response) => {
const val_obj = schema.validate(req.body).error
    if(!val_obj){
        var value = req.body.valor.replace(',','.')
        const qry = await pool.query('INSERT INTO vendas (valor, numero_cartao, id_adquirente, numero_parcelas, id_bandeira_cartao, data_venda) VALUES ('+value+","+req.body.numero_cartao+","+req.body.id_adquirente+","+req.body.numero_parcelas+","+req.body.id_bandeira_cartao+","+"'"+req.body.data_venda+"'"+")")
        res.send(qry)
    }
    else{
        res.send(val_obj)
    }
})

app.listen(port, () => {
  console.log('Server started at http://localhost:'+port)
})
