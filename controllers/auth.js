const {response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } =require('../helpers/jwt');
const login =async  (req,res=response) =>{

    const {password,email} =req.body;

    try {

        const usuarioBD = await Usuario.findOne({email});

        if (!usuarioBD)
        {   
            return res.status(404).json({
                ok:false,
                msg:'El email no existe'
            })
        };        

        
        const validPassword = bcrypt.compareSync(password,usuarioBD.password);

        if (!validPassword)
        {
            return res.status(404).json({
                ok:false,
                msg:'Password no válido'
            })
        }

        const token  = await generarJWT(usuarioBD.id);

        res.json({
            ok:true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        });
    }

};

module.exports={
    login
}