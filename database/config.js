const mongoose = require('mongoose');
require('dotenv').config();
//Async son promesas Sincrónicas
const dbConnection = async() => {

    try {
        await  mongoose.connect(process.env.BD_CNN,{
            useNewUrlParser:true,
            useUnifiedTopology:true           
        });     
        console.log("Base Datos On line");
    } catch (error) {
        console.log(error);
        throw new Error("Error a la hora de ver la BD ");
    }

   

}

module.exports= {
    dbConnection
}