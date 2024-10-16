const _ = require('lodash')

const existsById = (Model) => {
    return async(req, res, next) =>{
        const id = req.params.id
        const instancia = await Model.findByPk(id)
        const modelName = Model.modelName || (Model.options.name && Model.options.name.singular);
        if (!instancia)
            res.status(404).json(`El ${modelName} con id ${id} no existe`)
        else
            next()
    }
}

const existsAllIdInModel = (Model) => {
    return async(req, res, next) =>{
        const list = req.body
        const errores = []
        const modelName = Model.modelName || (Model.options.name && Model.options.name.singular);
        await Promise.all(
            list.map( async(element) => {
                const instancia = await Model.findByPk(element.id)
                if (!instancia)
                    errores.push(`El ${modelName} con id ${element.id} no existe`)
            })
        )
        if(errores.length == 0)
            next()
        else
            res.status(404).json({errores})


    }
}

const existsAllRegistersInModel= (Model)  => {
    return async(req, res, next) =>{
        const list = req.body
        const errores = []
        const modelName = Model.modelName || (Model.options.name && Model.options.name.singular);
        await Promise.all(
            list.map( async(element) => {
                const instancia = await Model.findByPk(element.id)
                const esValido = _.isEqual(element, instancia.dataValues)
                console.log(element)
                console.log(instancia)
                if (!esValido)
                    errores.push(`El ${modelName} con id ${element.id} tiene datos incorrectos`)
            })
        )
        if(errores.length == 0)
            next()
        else
            res.status(400).json({errores})
    }
}

const existsIdInOtherModel = (Model, ModelToCheck, fk) => {
    return async (req, res, next) => {
        const idToFind = req.params.id
        const modelName = Model.modelName || (Model.options.name && Model.options.name.singular);
        const ModelToCheckName = ModelToCheck.modelName || (ModelToCheck.options.name && ModelToCheck.options.name.singular);
        const rowsToCheck = await ModelToCheck.findAll({where: {[fk]: idToFind}})
        if (rowsToCheck.length > 0)
           return res.status(500).json(`El ${modelName} con id ${idToFind} tiene relación con otro registro de ${ModelToCheckName} en la base de datos y no se pudo borrar`)
        next()
    }
}

module.exports = {existsById, existsIdInOtherModel, existsAllIdInModel, existsAllRegistersInModel}