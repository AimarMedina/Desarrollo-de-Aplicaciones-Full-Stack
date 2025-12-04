const express = require('express')
const app = express()

app.use(express.json())

app.get('/y',(req,res) =>{
    res.send('Hola desde /y')
})

app.get('/about',(req,res) =>{
    res.send('Hola desde /about')
})

const PORT = 3330
app.listen(PORT, () =>{
    console.log('Servidor escuchando en http:/localhost:'+PORT);
})
