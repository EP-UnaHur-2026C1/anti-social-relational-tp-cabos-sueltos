//console.log("UnaHur - Anti-Social net");

const express = require('express')
const app = express()
const db = require('../models')
const { User } = require('../models')
const port = 3000

app.use(express.json())

app.listen(port, async () =>{
    await db.sequelize.sync()
    console.log(`Servidor corriendo en http://localhost:${port}`)
})

app.get('/usuarios', async (req,res)=>{
    try {
        const usuarios = await User.findAll()
        res.status(200).json(usuarios)
        
    } catch (error) {
        res.status(500).json({message: "error al obtener los clientes"})
    }
    
})


app.post('/usuarios', async (req,res)=>{
    try {
        const crearUsuario = await User.create({
            nickname: "crais",
            email: "hola@gmail.com",
            password: "123"
        })
        res.status(200).json({message: "usuario creado correctamente"})
        
    } catch (error) {
        res.status(500).json({message: "error al crear el usuario"})
    }
    
})

app.get('/usuarios/:nickname', async (req,res)=>{ // buscar usuario especifico
    try {
        const { nickname } = req.params


        const usuarioEspecifico = await User.findOne({
            where: {
                nickname: nickname
            },
            attributes: ['nickname']
        })

        if (!usuarioEspecifico) {
            res.status(404).json({message: "el usuario no existe"})
        }
        
        res.status(200).json(usuarioEspecifico)
        
    } catch (error) {
        res.status(500).json({message: "error del lado del servidor"})
    }
    
})