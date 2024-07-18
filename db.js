const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shalinfo@102',
    database: 'todotaskmanager'
})

module.exports = connection;