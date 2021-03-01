const usuarioModel = require("../models/usuario.model");
const bcrypt = require('bcryptjs');
const { generarJwt } = require("../helpers/generarJWT");


const login = async(req,res)=>{

    const { email, password}= req.body;

    try {
        const usuario = await usuarioModel.findOne({email});

        if(!usuario){
            res.json({
                statusCode:false,
                msg:'Usuario y/o contraseña son invalidos**'
            });
        }

        const validarPassword = bcrypt.compareSync(password, usuario.password);

        if(!validarPassword){
            res.json({
                statusCode:false,
                msg:'Usuario y/o contraseña son invalidos'
            });
        }
        
        const { id, rol }= usuario;
        console.log(id,rol);

        token = await generarJwt(id,rol);

        res.json({
            statusCode:true,
            token
        });

    } catch (error) {
        res.status(500).json({
            statusCode:false,
            msg:'no se pudo iniciar sesion'
        });
    }

};

module.exports ={
    login
};