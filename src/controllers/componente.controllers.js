const { Componente } = require('../db/models')

const componenteController = {}

const getAllComponentes = async (req, res) => {
    const componentes = await Componente.findAll()
    res.status(200).json(componentes)
}

controller.getAllComponentes = getAllComponentes

const getComponenteById = async (req, res)=> {
    const id = req.params.id
    const componente = await Componente.findByPk(id)
    if (componente) {
        res.status(200).json(componente)
    } else {
        res.status(404).json({ mensaje: `El id ${id} no se encuentra.` })
    }
}

controller.getComponenteById = getComponenteById

const postComponente = async (req,res) => {
    const { nombre, descripcion } = req.body
    try {
      const componente = await Actores.create({   
        nombre,   
        descripcion,
    })
    res.status(201).json(componente);  
    } 
    catch (error) {
        res.status(400).json({message: "Error en la creación del componente"})
    }  
}

controller.postComponente = postComponente

const updateComponente = async (req,res) => {
    const { nombre, descripcion } = req.body
    try {
        const id = req.params.id
        const componente = await Componente.findByPk(id)
        await componente.update({
            nombre, descripcion 
        })
        res.status(200).json(componente)
    }
    catch (error) {
        res.status(404).json({message: "Error en al modificar el componente"})
    }
}

controller.updateComponente = updateComponente

const deleteComponente = async (req,res) => {
    try {
        const id = req.params.id;
        const componente = await Componente.destroy({where: {id}})

        if (componente === 0) {
            return res.status(404).json({ message: `El componente con id ${id} no existe.` })
        }

        res.status(200).json({ mensaje: `El componente con id ${id} fue eliminado con éxito.` })
    }
    catch (error) {
        res.status(500).json({message: "Error en al eliminar el componente"})
    }
}

controller.deleteComponente = deleteComponente

module.exports = componenteController