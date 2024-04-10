const { Client } = require('pg')

const client = new Client({
    host: 'database-1.ca99ohesjed8.us-east-1.rds.amazonaws.com',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres',
    ssl: {
      rejectUnauthorized: false,
    },
  })
  
client.connect()
  .then(() =>  console.log(' Connected to database '))
  .catch((err) => console.log('💀 Error connecting to database', err))


exports.query = async (query, values) => {
  const { rows } = await client.query(query, values)
  return rows
}


