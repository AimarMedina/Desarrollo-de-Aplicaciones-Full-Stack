const db = require('../db.js')

module.exports = {
    getUsers(callback) {
       db.query('Select * From users', callback)
    },
    insertUser(usuario,callback) {
        const sql = 'Insert Into users (nombre,apellidos,email,fecha_nacimiento,edad,dni,genero) VALUES (?,?,?,?,?,?,?)'
        db.query(sql,[
            usuario.nombre,
            usuario.apellidos,
            usuario.email,
            usuario.fecha_nacimiento,
            usuario.edad,
            usuario.dni,
            usuario.genero
        ], callback)
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
