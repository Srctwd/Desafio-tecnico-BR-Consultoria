import { Pool } from 'pg'

export const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'client_user',
  password: '123',
  database: 'db'
})
