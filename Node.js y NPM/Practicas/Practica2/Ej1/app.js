const userController = require('./controllers/UserController.js')
const express = require('express')
const path = require('path')
const app = express()


app.use(express.json())

app.use(express.static(path.join(__dirname,'public')))

app.get('/',(req,res) =>{
    res.sendFile('index.html')
})

let PORT = 3000
app.listen(PORT,()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})

app.get('/api/getUsers', userController.getUsers)
app.post('/api/insertUser', userController.insertUser)
app.delete('/api/delUser/:id',userController.deleteUser)
app.put('/api/updateUser',userController.updateUser)
