const { Router } = require('express');;
const { getGenerosApi } = require('./route/generosGet');
const videogamesGet = require('./route/videogamesGet');
const getVideosgamesId = require('./route/videogamesIdGet');
const getVideogamesPost = require('./route/videogamesPost');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Ejemplo: router.use('/auth', authRouter);
router.use('/genres', getGenerosApi)
router.use('/videogames', videogamesGet)
router.use('/videogame', getVideosgamesId)
router.use('/videogames', getVideogamesPost)


module.exports = router;
