const express = require('express');
const cors =require('cors');
const{dbConnection}=require('./database/config');

require('dotenv').config();


const app = express();

app.use(cors());

app.use(express.json());

dbConnection();

//rutas

app.use('/api/piezas',require('./routes/pieza.routes.js'));
app.use('/api/usuario',require('./routes/usuario.routes'));
app.use('/api/login',require('./routes/auth.routes'));
app.use('/api/subir',require('./routes/subirImg.routes'));






app.listen(process.env.PORT, ()=>{
    console.log('corriendo en el puerto'+ process.env.PORT);
})