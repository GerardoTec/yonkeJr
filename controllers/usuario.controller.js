const usuarioModel = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const { generarJwt } = require('../helpers/generarJWT');


 getUsuarios = async(req,res)=>{

    const usuario = await usuarioModel.find();

    res.json({
        statusCode:true,
        usuario
    });
};

crearUsuario = async(req,res)=>{
    
    const { email, password}=req.body;

    try{ 
        const existe = await usuarioModel.findOne({email});

        if(existe){
            return res.status(500).json({
                statusCode:false,
                msg:'Ya existe un usuario con ese email'
            });
        }

        const usuario = new usuarioModel(req.body);

           // encriptar la contraseña 
           const salt = bcrypt.genSaltSync();
           usuario.password = bcrypt.hashSync(password,salt);

            //guardar usuario

         await usuario.save();
         console.log(usuario);
         

        //  token = await generarJwt();

         res.json({
             statusCode:true,
             usuario,
             //token
         });
         
  
         } catch (error) {
         res.json({
             statusCode:false,
             msg:'No se pudo crear Usuario'
         });
     }
};

actualizarUsuario = async(req,res)=>{

    const id = req.params.id;

    try {
        const usuario = await usuarioModel.findById(id);

        if(!usuario){
            return res.json({
                statusCode:false,
                msg:'No hay un usuario con es ID'
            });
        }

        const campos = new usuarioModel(req.body);

        const usuarioActualizado = await usuarioModel.findByIdAndUpdate(id,campos,{new:true});

        res.json({
            statusCode:true,
            msg:'usuario actualizado',
            usuarioActualizado
        });

    } catch (error) {
        res.status(500).json({
            statusCode:false,
            msg:'No se pudo actualizar el usuario'
        });
    }

};

borrarUsuario = async(req,res)=>{

    const id = req.params.id;

    try {
        const usuario = await usuarioModel.findById(id);
        if(!usuario){
            return res.json({
                statusCode:false,
                msg:'No existe un usuario con ese ID'
            });
        }

        await usuarioModel.findByIdAndDelete(id);

        res.json({
            statusCode:true,
            msg:'usuario borrado'
        });

    } catch (error) {
        res.status(500).json({
            statusCode:false,
            msg:'No se pudo borrar el usuario'
        });
    }

};

module.exports ={
    crearUsuario,
    getUsuarios,
    actualizarUsuario,
    borrarUsuario

};