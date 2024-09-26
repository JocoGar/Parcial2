const express = require('express');
const router = express.Router();
const sneakerController = require('../controllers/sneaker.controller.js');
const usuarioController = require('../controllers/usuario.controller.js');


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

module.exports = router;
