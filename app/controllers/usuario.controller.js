const db = require('../config/db.config.js');
const Usuario = db.Usuario;

exports.create = (req, res) => {
    let usuario = {};

    try {
        usuario.nombre = req.body.nombre;
        usuario.correo = req.body.correo;
        usuario.contrasenia = req.body.contrasenia;
        usuario.fecha_creacion = req.body.fecha_creacion;

        Usuario.create(usuario).then(result => {
            res.status(200).json({
                message: "Usuario creado exitosamente con id = " + result.id_usuario,
                usuario: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear el usuario!",
            error: error.message
        });
    }
};

exports.retrieveAllUsuarios = (req, res) => {
    Usuario.findAll()
        .then(usuarioInfos => {
            res.status(200).json({
                message: "¡Usuarios obtenidos exitosamente!",
                usuarios: usuarioInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener los usuarios!",
                error: error
            });
        });
};


exports.getUsuarioById = (req, res) => {
    let usuarioId = req.params.id;
    Usuario.findByPk(usuarioId)
        .then(usuario => {
            res.status(200).json({
                message: "Usuario obtenido exitosamente con id = " + usuarioId,
                usuario: usuario
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener usuario con id!",
                error: error
            });
        });
};


exports.updateById = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            res.status(404).json({
                message: "No se encontró el usuario para actualizar con id = " + usuarioId,
                usuario: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                correo: req.body.correo,
                contrasenia: req.body.contrasenia,
                fecha_creacion: req.body.fecha_creacion
            };

            let result = await Usuario.update(updatedObject, { returning: true, where: { id_usuario: usuarioId } });

            res.status(200).json({
                message: "Actualización exitosa de un usuario con id = " + usuarioId,
                usuario: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar el usuario con id = " + req.params.id,
            error: error.message
        });
    }
};

exports.deleteById = async (req, res) => {
    try {
        let usuarioId = req.params.id;
        let usuario = await Usuario.findByPk(usuarioId);

        if (!usuario) {
            res.status(404).json({
                message: "No existe el usuario con id = " + usuarioId,
                error: "404",
            });
        } else {
            await usuario.destroy();
            res.status(200).json({
                message: "Eliminación exitosa del usuario con id = " + usuarioId,
                usuario: usuario,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar el usuario con id = " + req.params.id,
            error: error.message,
        });
    }
};
