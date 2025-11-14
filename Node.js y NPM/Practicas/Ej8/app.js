const express = require('express')
const path = require('path')
const app = express()

app.use(express.json())

app.use(express.static(path.join(__dirname,'public')))

app.get('/',(req,res) =>{
    res.sendFile(path.join(__dirname,'./public/index.html'))
})

let PORT = 3000
app.listen(PORT,()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})


const fs = require('fs');
let users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));

app.get('/api/getUsers',(req,res) =>{
    res.json(users)
})

app.delete('/api/delUser/:id', (req,res) =>{
    const id = parseInt(req.params.id)
    let userIndex = users.findIndex((user) => user.id === id)
    users.splice(userIndex,1)        
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2)); // guardar cambios en JSON

    res.json({success: true})
})

app.post('/api/insertUser',(req,res) =>{
    const user = req.body

    const id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    
    const newUSer = {
        'id': id,
        'nombre': user.nombre,
    }

    users.push(newUSer) 
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));


    res.json({success: true})
    
})

app.put('/api/updateUser',(req,res)=>{
    const newUser = req.body    
    const oldUser = users.find(user => user.id == newUser.id);

    const oldUserIndex = users.findIndex(user=> user.id === oldUser.id)
    users[oldUserIndex].nombre = newUser.nombre

    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

    res.json({success: true})
})