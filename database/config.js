const mongoose = require('mongoose');
require ('dotenv').config();

const dbConnection = async ()=>{

    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology:true,
            useCreateIndex: true

            
        });
        console.log('Base de datos Online');
    } catch (error) {

        console.log(error);
        throw new Error(' Error al conectar la base de datos');
        
    }
};


module.exports = {
    dbConnection
};