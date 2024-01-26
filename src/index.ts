import express, { Express, Request, Response, NextFunction, Application } from 'express'
import { router } from './routes/vendas'
interface Error {
  status?: number;
}

const app: Application = express()
const port = 3001
app.use(express.json())

// routes
app.use('/vendas', router)

// Json validation
app.use((err: Error, req: Request, res: Response, next: NextFunction ) => {
    if(err.status == 400)
       return res.send('Invalid JSON\n')
    return next(err)
});

// server start
app.listen(port, () => {
  console.log('Server started at http://localhost:'+port)
})
