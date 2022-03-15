
const {response} =require('express');
const Hospital = require('../models/hospital');
const getHospitales = async (req,res=response) =>{

    const hospitales = await Hospital.find()
                                    .populate('usuario','nombre email img');
    res.json({

        ok:true,
        hospitales
    });



};

const crearHospitale =async (req,res=response) =>{
    //Agrega el uid del usuario dentro de la creación de la clase Hospital
    const uid = req.uid;
    const hospital = new Hospital({
        usuario:uid,
        ...req.body
    });


    try {
     const hospitalBD=   await hospital.save();

     res.json({

        ok:true,
        hospital:hospitalBD
    });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:"Hable con el Administrador"            
        })
    }

   

};

const actualizarHospital = (req,res=response) =>{


    res.json({

        ok:true,
        msg:'actualizarHospital'
    });

};

const borrarHospitale = (req,res=response) =>{


    res.json({

        ok:true,
        msg:'borrarHospitale'
    });

};


module.exports = {
    getHospitales,
    crearHospitale,
    actualizarHospital,
    borrarHospitale
}