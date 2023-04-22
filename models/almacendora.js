const {Schema, model} = require('mongoose');

const SchemaAlmacenadora = Schema({
    nombre:{
        type: String,
        required:true,
        unique:true
    },
    descripcion:{
        type: String,
    },
    fecha_inicio:{
        type: Date,
        required: true
    },
    fecha_cierre:{
        type: Date,
        required:true
    },
    creador:{
        type: String,
        required:true
    },
    estado:{
        type: Boolean,
        default: true
    }
})

module.exports = model('almacenadora', SchemaAlmacenadora)