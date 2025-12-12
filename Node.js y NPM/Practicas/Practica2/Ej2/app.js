const userController = require('./controllers/UserController.js')
const express = require('express')
const app = express()
const {body, validationResult} = require('express-validator')
const UserController = require('./controllers/UserController.js')

app.use(express.json())

app.use(express.static('public'))

app.get('/',(req,res) =>{
    res.sendFile('index.html')
})

let PORT = 3000
app.listen(PORT,()=>{
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})

app.get('/api/getUsers', userController.getUsers)
app.post('/api/insertUser',
    body('nombre').isLength({min:3}).withMessage('Nombre muy corto.'),
    body('apellidos').isLength({min: 5}).withMessage('Apellido muy corto.'),
    body('email').isEmail().withMessage('Email inválido.'),
    body('edad').isInt({min: 0, max: 100}).withMessage('Edad invalida, tiene que estar comprendida entre 0 y 100.'),
    body('dni').isIdentityCard('ES').withMessage('DNI no es valido'),
    body('genero').toUpperCase().isIn(['F','M','X']).withMessage('Sexo no valido.'),
    body('fecha_nacimiento').isDate().withMessage('Fecha de nacimiento es incorrecta.').custom((valor)=>{
        const hoy = new Date()
        const fechaIntroducida = new Date(valor)
        if(fechaIntroducida > hoy){
            throw new Error('La fecha de nacimiento no puede ser futura a la de hoy.')
        }
        return true
    }),

    (req, res, next) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errores: errors.array()})
        }
        next()
    },
    UserController.insertUser
)
app.delete('/api/delUser/:id',userController.deleteUser)
app.put('/api/updateUser',userController.updateUser)
