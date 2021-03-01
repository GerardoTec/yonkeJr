const { Router } = require("express");
const { crearPieza, getPiezas,elmininarPieza,actualizar } = require("../controllers/piezas.controller");
const fileUpload = require('express-fileupload');
const { validarJWT } = require("../middleware/validarJWT");
const { route } = require("./usuario.routes");



const router = Router();

router.use(fileUpload());

router.get('/',validarJWT, getPiezas);

router.post('/:marca',validarJWT, crearPieza);

router.put('/:id', validarJWT,actualizar)

router.delete('/:id',validarJWT, elmininarPieza);

module.exports = router;