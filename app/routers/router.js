const express = require('express');
const router = express.Router();
const sneakerController = require('../controllers/sneaker.controller.js');
const usuarioController = require('../controllers/usuario.controller.js');
const proyectoController = require('../controllers/proyecto.controller.js');


router.post('/api/sneakers/create', sneakerController.create);
router.get('/api/sneakers/all', sneakerController.retrieveAllSneakers);
router.get('/api/sneakers/onebyid/:id', sneakerController.getSneakerById);
router.put('/api/sneakers/update/:id', sneakerController.updateById);
router.delete('/api/sneakers/delete/:id', sneakerController.deleteById);

router.post('/api/usuarios/create', usuarioController.create);
router.get('/api/usuarios/all', usuarioController.retrieveAllUsuarios);
router.get('/api/usuarios/onebyid/:id', usuarioController.getUsuarioById);
router.put('/api/usuarios/update/:id', usuarioController.updateById);
router.delete('/api/usuarios/delete/:id', usuarioController.deleteById);

router.post('/api/proyectos/create', proyectoController.create);
router.get('/api/proyectos/all', proyectoController.retrieveAllProyectos);
router.get('/api/proyectos/onebyid/:id', proyectoController.getProyectoById);
router.put('/api/proyectos/update/:id', proyectoController.updateById);
router.delete('/api/proyectos/delete/:id', proyectoController.deleteById);


module.exports = router;
