const {Router} = require('express');
const { getTareas, postTarea, putTarea, deleteTarea } = require('../controllers/almacenadora');
const { check } = require('express-validator');

const api = Router();

api.get('/mostrar', getTareas)

api.post('/agregar',[
    check('nombre', 'El nombre no puede ser repetido')
], postTarea);

api.put('/editar/:id', putTarea);

api.delete('/delete/:id', deleteTarea);

module.exports = api;