const {response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } =require('../helpers/jwt');

const {googleVerify} = require('../helpers/google-verify');
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

const googleSignIn = async (req,res=response)=>{

    const googleToken = req.body.token;
  
    let datos = {
        name:'',email:'',picture:''
    }
    try {
     
        datos =   await googleVerify(googleToken);
        let usuario;
        const usuarioDB = await Usuario.findOne({email:datos.email});
        if (!usuarioDB) {
            usuario = new Usuario({
                nombre:datos.name,
                email:datos.email,
                password:'@@@',
                img:datos.picture,
                google:true
            })
        } else {
            usuario =usuarioDB;
            usuario.google=true;
            usuario.password="@@@";
        }
        console.log("usaurio",usuario.nombre);

        await usuario.save();

        const token  = await generarJWT(usuario.id);

        res.json({
            ok:true,          
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok:false,
            msg:"Error inesperado token no nes correcto"
        })
    }



};

module.exports={
    login,googleSignIn
}