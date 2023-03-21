const mysql = require('mysql')

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "qwerty",
    database: "joga_sequelize"
});

module.exports = db