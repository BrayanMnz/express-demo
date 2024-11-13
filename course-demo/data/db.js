const { Pool } = require('pg')
const { credentials } = require('../config')

const { connectionString } = credentials.postgres
const pool = new Pool({ connectionString })

module.exports = {
  getUsers: async () => {
    const { rows } = await pool.query('SELECT * FROM USERS')
    return rows;
  }, 

  addUser: async (name, email, passwd, address, phone, terms) => {
    await pool.query(
        'INSERT INTO USERS (name, email, password, address, phoneNumber, terms)' +
        'VALUES ($1, $2, $3, $4, $5, $6)' +
        'ON CONFLICT DO NOTHING',
      [name, email, passwd, address, phone, terms]
    )
  }
}