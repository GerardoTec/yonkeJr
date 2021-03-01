const jwt = require(`jsonwebtoken`);


const validarJWT = ( req, res, next)=>{
// validamos que venga por los headers nuestro token
    const token = req.header('x-token');
   
    try {
// checamos si viene 
    if( !token ){
        return res.status(401).json({
            ok: false,
            mensaje: ' no hay ningun token en la peticion'
        });
    }

    // destructuramos y despues se lo pasamos a req.id
        const { id, rol, } = jwt.verify(token,process.env.seed);
      
        req.id = id;
  
        console.log(req.id);
        console.log(rol);

        if( req.method !=='GET'){
            if(rol ==='administrador')next();
            else res.status(403).json({msg:'No tienes permisos para esta Accion, Hable con el administrador'});
        }else{
          next();
        }
 
            
    } catch (error) {
        console.log(error);
         res.status(500).json({
            ok: false,
            mensaje: ' Token no valido'
        });
        
    }
  

};

module.exports = {
    validarJWT,
    
   
};