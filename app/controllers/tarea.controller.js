const db = require('../config/db.config.js');
const Tarea = db.Tarea;

// Crear una nueva tarea
exports.create = (req, res) => {
    let tarea = {};

    try {
        tarea.nombre = req.body.nombre;
        tarea.estado = req.body.estado;
        tarea.fecha_creacion = req.body.fecha_creacion;
        tarea.fecha_vencimiento = req.body.fecha_vencimiento;

        Tarea.create(tarea).then(result => {
            res.status(200).json({
                message: "Tarea creada exitosamente con id = " + result.id_tarea,
                tarea: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "¡Fallo al crear la tarea!",
            error: error.message
        });
    }
};

// Obtener todas las tareas
exports.retrieveAllTareas = (req, res) => {
    Tarea.findAll()
        .then(tareaInfos => {
            res.status(200).json({
                message: "¡Tareas obtenidas exitosamente!",
                tareas: tareaInfos
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener las tareas!",
                error: error
            });
        });
};

// Obtener tarea por ID
exports.getTareaById = (req, res) => {
    let tareaId = req.params.id;
    Tarea.findByPk(tareaId)
        .then(tarea => {
            if (tarea) {
                res.status(200).json({
                    message: "Tarea obtenida exitosamente con id = " + tareaId,
                    tarea: tarea
                });
            } else {
                res.status(404).json({
                    message: "No se encontró la tarea con id = " + tareaId,
                    error: "404"
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "¡Error al obtener la tarea con id!",
                error: error
            });
        });
};

// Actualizar tarea por ID
exports.updateById = async (req, res) => {
    try {
        let tareaId = req.params.id;
        let tarea = await Tarea.findByPk(tareaId);

        if (!tarea) {
            res.status(404).json({
                message: "No se encontró la tarea para actualizar con id = " + tareaId,
                tarea: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                estado: req.body.estado,
                fecha_creacion: req.body.fecha_creacion,
                fecha_vencimiento: req.body.fecha_vencimiento
            };

            let result = await Tarea.update(updatedObject, { returning: true, where: { id_tarea: tareaId } });

            res.status(200).json({
                message: "Actualización exitosa de una tarea con id = " + tareaId,
                tarea: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede actualizar la tarea con id = " + req.params.id,
            error: error.message
        });
    }
};

// Eliminar tarea por ID
exports.deleteById = async (req, res) => {
    try {
        let tareaId = req.params.id;
        let tarea = await Tarea.findByPk(tareaId);

        if (!tarea) {
            res.status(404).json({
                message: "No existe la tarea con id = " + tareaId,
                error: "404",
            });
        } else {
            await tarea.destroy();
            res.status(200).json({
                message: "Eliminación exitosa de la tarea con id = " + tareaId,
                tarea: tarea,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "No se puede eliminar la tarea con id = " + req.params.id,
            error: error.message,
        });
    }
};
