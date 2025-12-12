const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodeJspractica2-2',
    port: 3306
})

db.connect(err =>{
    if (err) console.log('Error MySQL: ',err)
        else console.log('Conectado a Mysql');
})

module.exports = db
