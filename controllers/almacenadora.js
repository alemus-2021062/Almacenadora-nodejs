const { response, request } = require('express');
const Tarea = require('../models/almacendora');

const getTareas = async (req = request, res = response) => {
    try {
        const task = await Tarea.find();

        if (!task) {
            res.status(404).send({ message: "No hay tareas disponibles" });
        } else {
            res.status(200).json({ almacenadora: task, comentario: "Hola " });
        }
    } catch (err) {
        res.status(404).send({
            message: "No se pudo listar las tareas",
            err,
        });
    }
}


const postTarea = async (req = request, res = response) => {
    const { nombre, descripcion, fecha_inicio, fecha_cierre, creador } = req.body
    try {
        const name = await Tarea.findOne({ nombre: nombre })
        if (name) {
            return res.status(400).send({
                message: "El nombre de la tarea es repetido, cambialo",
                ok: false,
                tarea: name
            })
        }
        const guardarTarea = new Tarea({ nombre, descripcion, fecha_inicio, fecha_cierre, creador })
        await guardarTarea.save()
    } catch (error) {
        throw new Error(error)
    }
    res.json({
        msg: 'Tarea Agregada',
        //guardarTarea
    })
}



const putTarea = async (req = request, res = response) => {
    // try {
        const id = req.params.id;
        const tareaEdit = { ...req.body }
        console.log("tareaEdit", tareaEdit);
        const tareaEditada = await Tarea.findByIdAndUpdate(id, tareaEdit, { new: true });
        console.log(tareaEditada);
    // } catch (error) {
    //     throw new Error(error)
    // }
    res.json({
        msg: 'Tarea modificada',
        tareaEditada
    })
}



const deleteTarea = async (req = request, res = response) => {
    try {
        const id = req.params.id;
        const tareaEliminada = await Tarea.findByIdAndDelete(id);        
        return res.status(200).send({message: "tarea eliminada correctamente", tareaEliminada})
    } catch (err) {
        return res.status(500).send({message: err})
    }

    // return res.status(500).send({message: "Error en todo eliminar AAAAHHHH"})

}


module.exports = {
    getTareas,
    postTarea,
    putTarea,
    deleteTarea
}