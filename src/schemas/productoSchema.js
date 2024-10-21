const Joi = require("joi")

const productoSchema = Joi.object().keys({

    nombre: Joi.string().required().messages({
        "any.required": "El campo nombre es obligatorio",
        "string.empty": "El campo nombre no puede estar vacio"  

    }),

    descripcion: Joi.string().required().messages({
        "any.required": "El campo descripcion es obligatorio",
        "string.empty": "El campo descripcion no puede estar vacio"  

    }),

    precio: Joi.string().required().messages({
        "any.required": "El campo precio es obligatorio",
        "string.empty": "El campo precio no puede estar vacio"  

    }),
    pathImg: Joi.string().required().messages({
        "any.required": "El campo pathImg es obligatorio",
        "string.empty": "El campo pathImg no puede estar vacio"  

    })
})

module.exports = productoSchema