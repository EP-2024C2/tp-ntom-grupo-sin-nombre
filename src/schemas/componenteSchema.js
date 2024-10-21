const Joi = require("joi")

const componenteSchema = Joi.object().keys({

    nombre: Joi.string().required().messages({
        "any.required": "El campo nombre es obligatorio",
        "string.empty": "El campo nombre no puede estar vacio"  

    }),

    descripcion: Joi.string().required().messages({
        "any.required": "El campo descripcion es obligatorio",
        "string.empty": "El campo descripcion no puede estar vacio"  

    })
})

module.exports = componenteSchema