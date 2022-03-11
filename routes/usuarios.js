const {Router} = require('express');
const { getUsuarios,crearUsuarios, actualizarUsuarios,borrarUsuario } =require('../controllers/usuarios');
const { check }  = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router= Router();

/*
    Ruta : /api/usuarios
*/
router.get('/',validarJWT, getUsuarios);

router.post('/',
        [
            check('nombre',"El nombre es obligatorio").not().isEmpty(),
            check('password',"El password es obligatorio").not().isEmpty(),
            check('email',"El email es obligatorio").isEmail(),
            validarCampos,
        ],
        crearUsuarios);

router.put( '/:id',
        [
            validarJWT,
            check('nombre',"El nombre es obligatorio").not().isEmpty(),
            check('password',"El password es obligatorio").not().isEmpty(),
            check('email',"El email es obligatorio").isEmail(),  
            check('role',"El Role es obligatorio").not().isEmpty(),
            validarCampos            
        ], actualizarUsuarios);

router.delete('/:id',validarJWT,borrarUsuario);

module.exports =router;