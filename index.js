require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//Crear el servidor express

const app=express();

//configurar cors

app.use(cors());

//lectura y parseo del body

app.use(express.json());

//Base de datos

dbConnection();

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

//Rutas
//mean_user
//Lu1sAlej0



// });


app.listen(process.env.PORT,()=> {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})