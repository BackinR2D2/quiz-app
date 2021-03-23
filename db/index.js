const { Pool } = require('pg');

const options = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
    // ssl: true,
    // dialect: 'postgres',
    // dialectOptions: {
    //     "ssl": { "require": true }
    // }
}

const productionOption = {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
    // ssl: {
    //     rejectUnauthorized: false
    // }
}

const pool = new Pool(process.env.NODE_ENV === 'production' ? productionOption : options);

module.exports = {
    query: (text, params) => pool.query(text, params),
}