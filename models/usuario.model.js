const { Schema, model } = require("mongoose");


const UsuarioSchema = Schema({

    nombre:{
        type:String
    },
    email:{
        type: String,
        require: true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    domicilio:{
        type:String
    },
    telefono:{
        type:String
    },
    fotos:[{
        type:String
          }],
    rol:{
        type:String,
        require:true,
        default:'regular',
        enum:[
            'regular',
            'administrador'
         ]
    }

});

UsuarioSchema.method('toJSON', function()  {

    const { __v, ...object} = this.toObject();
    return object;
});
module.exports = model('Usuario',UsuarioSchema);