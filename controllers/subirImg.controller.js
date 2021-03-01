const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const usuarioModel = require('../models/usuario.model');





const subirImg = async(req=Request ,res=Response)=>{
 
    const id = req.params.id;
     const files = req.files.fotos;

    
     if(!req.files){
         return res.status(500).json({
             statusCode: false,
             msg:'No hay archivo que subir'
         });
     }

     console.log(files);
    

     const nombreCortado = files.name.split('.');    
     console.log(nombreCortado);
    extencionArchivo = nombreCortado[nombreCortado.length -1];

    console.log(extencionArchivo);

    extencionesValidas =['png','PNG','jpg','jpng','gif'];

    if(!extencionesValidas.includes(extencionArchivo)){
        return res.status(500).json({
            statusCode:false,
            msg:'No es una extencion valida'
        });
    }

    const nombreArchivo = `${uuidv4()}.${extencionArchivo}`;

    const usuario = await usuarioModel.findById(id);
    console.log(usuario);
            if (!usuario) {
                return res.json({
                    statusCode:false,
                    msg:'no hay un usuario con ese ID'
                });
          }
          
   let pathViejo = `./uploads/usuarios/${usuario.id}/${usuario.fotos}`;
   console.log(pathViejo);

   if(fs.existsSync(pathViejo)){
       fs.unlinkSync(pathViejo);
   }

    pathMarca = path.resolve(`./uploads/usuarios/${usuario.id}`);
       fs.mkdirSync(pathMarca,{recursive:true});

    const pathGuardar = `${pathMarca}/${nombreArchivo}`

    console.log(pathGuardar);

    files.mv(pathGuardar, (err)=>{
        if(err){
            return res.status(403).json({
                statusCode:false,
                msg:'No se pudo mover la Foto'
            });
        }
        console.log('paso por aqui');
    });

        usuario.fotos = nombreArchivo;
        await usuario.save();
    

            res.json({
                statusCode:true,
                nombreArchivo
            });


};

retornarImagen = ( req,res)=>{

    const id = req.params.id;
    const foto = req.params.foto;

    const pathImagen = path.join(__dirname, `../uploads/usuarios/${id}/${foto}`);

    // imagen por defecto
if ( fs.existsSync( pathImagen ) ) {
    res.sendFile( pathImagen );
} else {
    const pathImagen = path.join( __dirname, `../uploads/no-img.png` );
    res.sendFile( pathImagen );
}

};





module.exports ={
    subirImg,
    retornarImagen
};