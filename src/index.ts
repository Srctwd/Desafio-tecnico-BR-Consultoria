import express, { Express, Request, Response, Application } from 'express';
import { Client } from 'pg'

const client = new Client()

async function client_connect(){
    try {
            await client.connect()
            const qry = await client.query('SELECT $1::text as message', ['Hello world!'])
            console.log(qry.rows[0].message)
            await client.end()
}
    catch{
            console.log("client not connected")
            
}}

const app: Application = express()
const port = 3000

app.get('/', async (req: Request, res: Response) => {
    res.send("466")
})

app.listen(port, () => {
  console.log('Server started at http://localhost:'+port)
})

client_connect()
