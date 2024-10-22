const _ = require('lodash');
const { body, validationResult } = require('express-validator');

const existsById = (Model) => {
    return async (req, res, next) => {
        const id = req.params.id;
        const instancia = await Model.findByPk(id);
        const modelName = Model.modelName || (Model.options.name && Model.options.name.singular);
        
        if (!instancia) {
            return res.status(404).json(`El ${modelName} con id ${id} no existe`);
        }
        next();
    };
};

const existsAllIdInModel = (Model) => {
    return async (req, res, next) => {
        const list = req.body;
        const errores = [];
        const modelName = Model.modelName || (Model.options.name && Model.options.name.singular);
        
        await Promise.all(
            list.map(async (element) => {
                const instancia = await Model.findByPk(element.id);
                if (!instancia) {
                    errores.push(`El ${modelName} con id ${element.id} no existe`);
                }
            })
        );

        if (errores.length === 0) {
            next();
        } else {
            res.status(404).json({ errores });
        }
    };
};

const existsAllRegistersInModel = (Model) => {
    return async (req, res, next) => {
        const list = req.body;
        const errores = [];
        const modelName = Model.modelName || (Model.options.name && Model.options.name.singular);
        
        await Promise.all(
            list.map(async (element) => {
                const instancia = await Model.findByPk(element.id);
                const esValido = instancia && _.isEqual(element, instancia.dataValues);

                if (!esValido) {
                    errores.push(`El ${modelName} con id ${element.id} tiene datos incorrectos`);
                }
            })
        );

        if (errores.length === 0) {
            next();
        } else {
            res.status(400).json({ errores });
        }
    };
};

const existsIdInOtherModel = (Model, ModelToCheck, fk) => {
    return async (req, res, next) => {
        const idToFind = req.params.id;
        const modelName = Model.modelName || (Model.options.name && Model.options.name.singular);
        const ModelToCheckName = ModelToCheck.modelName || (ModelToCheck.options.name && ModelToCheck.options.name.singular);
        
        const rowsToCheck = await ModelToCheck.findAll({ where: { [fk]: idToFind } });
        
        if (rowsToCheck.length > 0) {
            return res.status(500).json(`El ${modelName} con id ${idToFind} tiene relación con otro registro de ${ModelToCheckName} y no se pudo borrar`);
        }
        next();
    };
};

const validateSchema = (schema) => {
    return  async (req, res, next) => {
        const result = schema.validate(req.body, {abortEarly: false})
        if (result.error) {
            return res.status(400).json(
                {
                    errores : result.error.details.map( error=> ( {
                        error: error.message
                    })
                )}  
            )
        }
        next()
    }
}
module.exports = {existsById, existsIdInOtherModel, existsAllIdInModel, existsAllRegistersInModel,validateSchema}