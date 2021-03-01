const { Router } = require("express");
const { crearUsuario, getUsuarios, actualizarUsuario, borrarUsuario } = require("../controllers/usuario.controller");
const { validarJWT } = require("../middleware/validarJWT");
const { route } = require("./pieza.routes");



const router = Router();

router.get('/',getUsuarios)
router.post('/', validarJWT, crearUsuario);
router.put('/:id',validarJWT, actualizarUsuario);
router.delete('/:id',validarJWT, borrarUsuario);


module.exports=router;