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

//directorio publico

app.use(express.static('public'));

app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/uploads', require('./routes/uploads'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));

//Rutas
//mean_user
//Lu1sAlej0



// });


app.listen(process.env.PORT,()=> {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
})