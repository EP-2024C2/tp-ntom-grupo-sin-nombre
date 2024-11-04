const Joi = require("joi")

const fabricanteSchema = Joi.object().keys({

    nombre: Joi.string().required().messages({
        "any.required": "El campo nombre es obligatorio",
        "string.empty": "El campo nombre no puede estar vacio"  

    }),

    direccion: Joi.string().required().messages({
        "any.required": "El campo direccion es obligatorio",
        "string.empty": "El campo direccion no puede estar vacio"  

    }),

    numeroContacto: Joi.number().required().messages({
        "any.required": "El campo numeroContacto es obligatorio",
        "string.empty": "El campo numeroContacto no puede estar vacio"  

    }),
    pathImgPerfil: Joi.string().required().messages({
        "any.required": "El campo pathImgPerfil es obligatorio",
        "string.empty": "El campo pathImgPerfil no puede estar vacio"  

    })
})

module.exports = fabricanteSchema