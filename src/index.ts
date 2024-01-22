import express, { Express, Request, Response, Application } from 'express';
import { pool } from './db_connect'
import Joi from "joi"

async function client_connect(){
    try {
            await pool.connect()
            const qry = await pool.query('SELECT $1::text as message', ['Hello world!'])
            console.log(qry.rows[0].message)
}
    catch (err: unknown){
            if (err instanceof Error){
                console.log(err.message)
            }
            
}}

const app: Application = express()
const port = 3000

app.get('/', async (req: Request, res: Response) => {
    await pool.connect()
    const qry = await pool.query('SELECT * FROM vendas')
    res.send(qry)
})

app.post('/vendas', async (req: Request, res: Response) => {
    await pool.connect()
    const qry = await pool.query('SELECT $1::text as message', ['Hello world!'])
    res.send(qry)
})


app.listen(port, () => {
  console.log('Server started at http://localhost:'+port)
})

client_connect()
