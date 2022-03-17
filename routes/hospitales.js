/*
    Hospitales
    ruta:'api/hospitales
*/

const {Router} = require('express');
const { check }  = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getHospitales,
    crearHospitale,
    actualizarHospital,
    borrarHospitales} =require('../controllers/hospitales');

const router= Router();

router.get('/', getHospitales);

router.post('/',
        [
            validarJWT,
            check('nombre',"El nombre es obligatorio").not().isEmpty(),
            validarCampos
        ],
        crearHospitale);

router.put( '/:id',
        [
            validarJWT,
            check('nombre',"El nombre del hospital es obligatorio").not().isEmpty(),
            validarCampos
        ], actualizarHospital);

router.delete('/:id',validarJWT,borrarHospitales);

module.exports =router;