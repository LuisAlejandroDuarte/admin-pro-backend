const Usuario = require('../models/usuario');
const Medico= require('../models/medico');
const Hospital= require('../models/hospital');
const fs = require('fs');

const borrarImagen =  async (path) => {

    
    if (fs.existsSync(path)) {
        //borra la imagen anterior
      await  fs.unlinkSync(path)
    }
}

const actualizarImagen =async (tipo,id,nombreArchivo) => {
let pathViejo='';
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('No es médico');
                return false;
            }

            pathViejo =`./uploads/medicos/${ medico.img }`;
            borrarImagen(pathViejo);
            medico.img=nombreArchivo;
            await medico.save();
            return true;

        break;
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                console.log('No es hospital');
                return false;
            }

            pathViejo =`./uploads/hospitales/${ hospital.img }`;
            borrarImagen(pathViejo);
            hospital.img=nombreArchivo;
            await hospital.save();
            return true;
        break;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No es usuario');
                return false;
            }

            pathViejo =`./uploads/usuarios/${ usuario.img }`;
            borrarImagen(pathViejo);
            usuario.img=nombreArchivo;
            await usuario.save();
            return true;
        break;
    
    default:
        break;
    }



    console.log('vamos bien');
}


module.exports= {
    actualizarImagen
}