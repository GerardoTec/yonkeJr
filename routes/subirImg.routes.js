const { Router } = require("express");
const { subirImg, retornarImagen } = require("../controllers/subirImg.controller");
const fileUpload = require('express-fileupload');
const { route } = require("./usuario.routes");


const router = Router();

router.use(fileUpload());

router.post('/:id', subirImg);

router.get('/:id/:foto',retornarImagen);


module.exports = router;