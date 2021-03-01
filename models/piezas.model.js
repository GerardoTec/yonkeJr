const { Schema,model } = require("mongoose");



const PiezasSchema = Schema({

    nombre:{
        type:String,
        require:true
    },
    marca:{
        type:String,
        require:true
    },
    modelo:{
        type:String
    },
    anio:{
        type:String
    },
    lado:{
        type:String
    },
    precio:{
        type:Number
    },
    cantidad:{
        type:Number
    },
    fechaActualizado:{
       type: Date
    },
    fotos:[
        {
        type:String
        }
    ]

});

PiezasSchema.method('toJSON', function()  {

    const { __v, ...object} = this.toObject();
    return object;
});

module.exports = model('Pieza',PiezasSchema);