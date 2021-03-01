const jwt = require('jsonwebtoken');

const generarJwt = (id,rol) => {

    return new Promise ( ( resolve, rejact) =>{

        payload={
            id,
            rol
        };
    
        jwt.sign( payload, process.env.seed,{
            expiresIn: '48h'
        }, (err, token)=> {
            
            if(err){
                console.log(err);
                rejact( 'no se pudo generar el JWT');
            }else{
                resolve( token );
            }
    
        });


    });

    

    
};

module.exports = {
    generarJwt
};