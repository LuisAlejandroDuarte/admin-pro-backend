
const {response} =require('express');
const Medico = require('../models/medico');
const getMedicos =async (req,res=response) =>{

    const medicos = await Medico.find()
                    .populate('usuario','nombre img')
                    .populate('hospital','nombre');
    res.json({

        ok:true,
        medicos
    });



};

const crearMedico =async (req,res=response) =>{
    const uid = req.uid;
    const medico = new Medico({
        usuario:uid,      
        ...req.body
    });

    

    try {
    
        var MedicoBD = await medico.save();
        res.json({

            ok:true,
            medico:MedicoBD
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok:false,
            msg:"Hable con el Administrador"            
        })
        
    }

    

};

const actualizarMedico = async  (req,res=response) =>{

    const id= req.params.id;
    const uid =req.uid;

    try {

        const medico = await Medico.findById(id);
        if (!medico) {
            return resp.status(404).json({
                ok:false,
                msg:"El médico no existe"
            })
        }

        const cambiosMedico = {
            ...req.body,
            usuario:uid            
        };

        const medicoActualizado = await Medico.findByIdAndUpdate(id,cambiosMedico,{new:true});

        res.json({
            ok:false,
            medicoActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error Inesperado'
        })
    }

};

const borrarMedico =async (req,res=response) =>{

    const id= req.params.id;

    
    try {

        const medicoBD = await Medico.findById(id);
        if (!medicoBD) {
            return res.status(401).json({
                ok:false,
                msg:'No se encontro el médico con ese Id'
            });
        }

        await Medico.findByIdAndDelete(id);

        res.status(200).json({
            ok:true,
            msg:'Medico eliminado'            
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
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}