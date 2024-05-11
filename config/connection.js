'use strict'

const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    password: 'postgres',
    port: 5432,
    database: 'IntelliTradeDB',
    host: 'localhost',
    idleTimeoutMillis: 500
})

module.exports = pool