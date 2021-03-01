const piezasModel = require("../models/piezas.model");
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const { json } = require("express");



getPiezas = async (req,res)=>{

    const pieza = await piezasModel.find();

    res.json({
        statusCode:true,
        pieza
    });

};

crearPieza = async(req,res)=>{

    const marca = req.params.marca;
    const files = req.files.fotos;
    
    if(!req.files){
         return res.json({
            statusCode:false,
            msg:'No hay ningun archivo que subir'
        });
    }

    const marcasValidas = ['honda','nissan','ford','chevrolet','volkswagen','jeep'];
    if ( !marcasValidas.includes(marca) ){
        return res.status(400).json({
            ok: false,
            msg: 'debes seleccionar la marca de la pieza (honda.nissan etc)'
        });
    }

    const extencionesValidas = ['jpg','JPG','png','PNG'];

    if(files.length){
        let valido = true;

        for(let i=0; i<files.length; i++){
            const nombreCortado = files[i].name.split('.');
            const extencionArchivo = nombreCortado[nombreCortado.length-1].toLowerCase();
            if(!extencionesValidas.includes(extencionArchivo)){
                valido= false;
                res.status(500).json({
                    statusCode:false,
                    msg:'No es una extencion valida'
                });
            }
                break;
        }
        if(!valido){
            return res.json({
                statusCode:false,
                msg:'Un archivo no es valido revisa las extenciones (jpg, png )'
            });
        }
        
    }else{
           // aqui solo llega cuando es un solo archivo 
           const nombreCortado = files.name.split('.');
           const extencionArchivo = nombreCortado[nombreCortado.length-1];
           if(!extencionesValidas.includes(extencionArchivo)){
               return res.status(500).json({
                   statusCode:false,
                   msg:'No es una extencion valida(png,jpg,pdf)'
               });
               
           }

    }
    

    const pieza = new piezasModel(req.body);
    
    const piezaDB = await pieza.save();

    pathMarca = path.resolve(`./archivos/${marca}`);
    fs.mkdirSync(pathMarca,{recursive:true});

    if(files.length){
        for(let i =0; i<files.length; i++){
            const pathGuardar = `${pathMarca}/${files[i].name}`
            files[i].mv(pathGuardar, (err)=>{
                if(err){

                    res.status(500).json({
                        statusCode:false,
                        msg:'Ocurrio un error al mover los archivos'
                    });
                }
            });
            nombreArchivo = `${files[i].name}`
            piezaDB.fotos.push(nombreArchivo);  
            await piezaDB.save(); 

        }
    }else{
        const pathGuardar = `${pathMarca}/${files.name}`;
        files.mv(pathGuardar, (err)=>{
            if(err){
                res.status(500).json({
                    statusCode:false,
                    msg:'No se pudo mover el archivo'
                });
            }
        });

        nombreArchivo = `${files.name}`
        piezaDB.fotos = nombreArchivo;
        await piezaDB.save();
    }

    res.json({
        statusCode:true,
        msg:'se creao con exito',
        piezaDB
    });
};

actualizar = async(req,res)=>{

    const id = req.params.id;

    try {
        const existe = await piezasModel.findById(id);

        if(!existe){
            return res.json({
                statusCode:false,
                msg:'No hay una pieza con ese Id'
            });
        }
        
        const campos = req.body;


        const actualizado = await piezasModel.findByIdAndUpdate(id,campos,{new:true});

        res.json({
            statusCode:true,
            msg:'actualizado',
            actualizado
        });

        

    } catch (error) {
        res.status(500).json({
            statusCode:false,
            msg:'No se pudo actualizar la pieza'
        });
    }

};

elmininarPieza = async(req,res)=>{

    const id = req.params.id;


    try {
        const existe = await piezasModel.findById(id);

        if(!existe){
            return res.json({
                statusCode:false,
                msg:'No hay una pieza con ese id'
            });
        }

        await piezasModel.findByIdAndDelete(id);

        res.json({
            statusCode:true,
            msg:'Pieza borrada'
        });
    } catch (error) {

        res.status(500).json({
            statusCode:false,
            msg:'No se pudo eliminar la pieza'
        });
        
    }

};

module.exports ={
    crearPieza,
    getPiezas,
    actualizar,
    elmininarPieza
}