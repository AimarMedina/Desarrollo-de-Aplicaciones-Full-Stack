const { updateUser } = require('../controllers/UserController.js')
const db = require('../db.js')

module.exports = {
    getUsers(callback) {
       db.query('Select * From users', callback)
    },
    insertUser(nombre,callback) {
        const sql = 'Insert Into users (nombre) VALUES (?)'
        db.query(sql, nombre, callback)
    },
    delUser(id,callback){
        const sql = 'Delete From users Where id = ?'
        db.query(sql,id,callback)
    },
    updateUser(id,nombre,callback){
        const sql = 'Update users Set nombre = ? Where id = ?'
        db.query(sql, [nombre,id], callback)
    }
}
