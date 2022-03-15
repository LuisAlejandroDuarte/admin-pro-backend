const {response} =require('express');
const fs = require('fs');
const path =require('path');
const { v4: uuidv4 } = require('uuid');

const { actualizarImagen } = require('../helpers/actualizar-imagen.js');

const fileUpload = async  (req,res=response)=>{

    const tipo= req.params.tipo;
    const id =  req.params.id;

    const tiposValidos  =['hospitales','medicos','usuarios'];

    if ( !tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok:false,
            msg:'El Tipo no válido no es medico, hospital, usuario'
        })
    }

    //Validar que exista el archivo
    if (!req.files || Object.keys(req.files).length==0) {
        
        return res.status(400).json({
            ok:false,
            msg:'No hay ningun archivos seleccioando'
        })

    }

    //Procesar la imagen
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length-1];

    //Valdiar la extensión
    const extensionesValidas =['png','jpg','jpeg','gif'];

    if (!extensionesValidas.includes(extensionArchivo))
    {
        return resp.status(400).json({
            ok:false,
            msg:'La extensión no es válida'
        })
    }

    //Generar el nombre del archivo
    //comillas invertidas Alt+96
    const nombreArchivo =`${uuidv4()}.${extensionArchivo}`;
    
    //Path Guardar la imagen

    const path = `./uploads/${tipo}/${nombreArchivo}`;

    file.mv(path,(err)=>{

        if (err) {
            console.log(err);
            return res.status(500).json({
                ok:false,
                msg:"Error al mover la imagen"
            });
        }

        //Actualizar base de datos
        actualizarImagen(tipo,id,nombreArchivo);

        res.json({
            ok:true,
            msg:'Archivo subido',
            nombreArchivo                
        })

    });

    


};


const retornaImagen = async (req,res=response) => {

    const tipo= req.params.tipo;
    const foto =  req.params.foto;

    const pathImg = path.join( __dirname,`../uploads/${tipo}/${foto}`);

    //imagen default
    if ( fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg =path.join( __dirname,`../uploads/no-img.png`);
        res.sendFile(pathImg);
    }    

};


module.exports = {fileUpload,retornaImagen};