
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

const actualizarHospital =async (req,res=response) =>{

    const id= req.params.id;
    const uid= req.uid;

    try {

        const hospitalBD = await Hospital.findById(id);
        if (hospitalBD){

            const caambiosHospital = {
                ...req.body,
                usuario:uid
            }

            const hospitalActualizado = await Hospital.findByIdAndUpdate(id,caambiosHospital,{new:true});
            res.json({
                ok:false,
                hospitalActualizado
            });

        } else {
            return resp.status(404).json({
                ok:false,
                msg:"El hospital no existe"
            })
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Error inesperado"
        })
    }

    const medico = new Hospital({            
        ...req.body
    });



};

const borrarHospitales =async (req,res=response) =>{

    const id= req.params.id;

    
    try {

        const hospitalBD = await Hospital.findById(id);
        if (!hospitalBD) {
            return res.status(401).json({
                ok:false,
                msg:'No se encontro el hospital con ese Id'
            });
        }

        await Hospital.findByIdAndDelete(id);

        res.status(200).json({
            ok:true,
            msg:'Hospital eliminado'            
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        });

    }

};


module.exports = {
    getHospitales,
    crearHospitale,
    actualizarHospital,
    borrarHospitales
}