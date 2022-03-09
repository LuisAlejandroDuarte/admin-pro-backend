require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//Crear el servidor express

const app=express();

//configurar cors

app.use(cors());

//Base de datos

dbConnection();


//Rutas
//mean_user
//Lu1sAlej0

app.get('/',(req,res)=>{
res.status(400).json({

    Ok:true,
    msg:'Hola mundo'
})

});


app.listen(process.env.PORT,()=> {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})