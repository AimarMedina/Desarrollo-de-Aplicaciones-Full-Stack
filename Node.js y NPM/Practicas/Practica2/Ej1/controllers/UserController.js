const User = require('../models/UsersModel.js')

module.exports = {
    getUsers(req, res) {
        User.getUsers((err, result) => {
            if (err) return res.status(500).json({error: err})
            res.json(result)
        })
    },
    insertUser(req, res){
        const user = req.body.nombre

        User.insertUser(user,(err, result) => {
            if(err) return res.status(500).json({error: err})
            res.json(result)
        })
    },
    deleteUser(req,res){
        const userId = req.params.id

        User.delUser(userId, (err,result) =>{
            if(err) return res.status(500).json({error: err})
            res.json({success: result})
        })
    },
    updateUser(req,res){
        const user = req.body

        User.updateUser(user.id,user.nombre,(err,result) =>{
            if(err) return res.status(500).json({error: err})
            res.json({success: result})
        })
    }
}
