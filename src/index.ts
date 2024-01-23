import express, { Express, Request, Response, NextFunction, Application } from 'express'
interface Error {
  status?: number;
}
import { pool } from './db_connect'
import { schema } from "./joi_schema"

const app: Application = express()
const port = 3000
app.use(express.json())
app.use((err: Error, req: Request, res: Response, next: NextFunction ) => {
    if(err.status == 400)
       return res.send('Invalid JSON\n')
    return next(err)
});

app.get('/', async (req: Request, res: Response) => {
    await pool.connect()
    const qry = await pool.query('SELECT * FROM vendas')
    res.send(qry)
})

app.post('/vendas', async (req: Request, res: Response) => {
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

app.listen(port, () => {
  console.log('Server started at http://localhost:'+port)
})
