const { response } =require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const res = require('express/lib/response');
const { generarJWT } =require('../helpers/jwt');
const getUsuarios = async (req,res)=>{

 
    const desde = Number(req.query.desde) || 0;
    console.log(desde);

    // const usuarios =await  Usuario.find({},'nombre email role google')
    //                              .skip(desde)
    //                              .limit(5);

    // const total = await Usuario.count();                                 
    
    const [usuarios,total] = await Promise.all([
        Usuario.find({},'nombre email role google img')
        .skip(desde),
        

      Usuario.countDocuments()

    ]);

    res.json({
    
        Ok:true,
        usuarios,
        uid:req.uid,
        total
        });
    
};

const crearUsuarios =async (req,res=response)=>{

    console.log(req.body);

    const {nombre, password, email} =req.body;
  


    try {        
        const existeEmail = await Usuario.findOne({email});

        if (existeEmail) {
            return res.status(400).json({
                ok:false,
                msg:"El correo ya existe"
            })
        }

        const usuario = new Usuario(req.body);

        //encriptar contraseña
        const salt =bcrypt.genSaltSync();
        usuario.password=bcrypt.hashSync(password,salt);

        await usuario.save();

        const token  = await generarJWT(usuario.id);

        res.json({
            Ok:true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Error inesperado"
        })
    }

};


const actualizarUsuarios = async (req,res=response) => {

    //TODO: valdiar token y si es el usuario correcto
    const uid= req.params.id;
    
    //Actualizaciones
    try {

        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB)
        {
            return res.status(404).json({
                ok:false,
                msg:'No existe usuario por ese Id'
            });
        }        

        const {password,google,email,...campos} =req.body;

        if (usuarioDB.email!==email)
        {
            const existeEmail = await Usuario.findOne({email});
            if (existeEmail)
            {
                return res.status(400).json({
                    ok:false,
                    msg:'El email ya existe'
                })
            }
        }

        campos.email=email;
        const usuarioActualziado = await Usuario.findByIdAndUpdate(uid,campos, {new: true});
            res.json({
                ok:true,  
                usuario:usuarioActualziado            
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Error inesperado"
        })
    }
};

const borrarUsuario = async (req,res=response)=>{
    const uid= req.params.id;

    try {
        const usuarioBD = await Usuario.findById( uid );
        if (!usuarioBD)
        {
            return res.status(404).json({
                ok:false,
                msg:'No existe usuario por ese Id'
            });
        }

       await Usuario.findByIdAndDelete(uid);

       res.status(200).json({
           ok:true,
           msg:'Usuario eliminado',
           uid
       }) 

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })
    }
};

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuarios,
    borrarUsuario
}