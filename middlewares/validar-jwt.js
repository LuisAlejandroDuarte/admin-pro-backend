const jwt = require('jsonwebtoken');

const validarJWT = (req,res,next) =>{

    //Leer Token
    const token = req.header('x-token');
    console.log(token);

    if (!token)
    {
        return res.status(401).json({
            ok:false,
            msg:'No hay respuesta del token'
        })
    }


    try {

        const {uid} =jwt.verify(token,process.env.JWT_SECRET);
        console.log(uid);
        req.uid=uid;

        next();
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'Token incorrecto'
        });
    }

 
}


module.exports= {
    validarJWT
}