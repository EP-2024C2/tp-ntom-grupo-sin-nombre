const { Componente, Producto_Componente } = require('../db/models')

const componenteController = {}

const getAllComponentes = async (req, res) => {
    try {
        const componentes = await Componente.findAll({})
        res.status(200).json(componentes)
    }
    catch (error) {
        res.status(404).json({ error: 'Error al obtener componentes' })
    }
}
componenteController.getAllComponentes = getAllComponentes

const getComponenteById = async (req, res)=> {
    const id = req.params.id
    const componente = await Componente.findByPk(id)
    if (componente) {
        res.status(200).json(componente)
    } else {
        res.status(404).json({ mensaje: `El id ${id} no se encuentra.` })
    }
}

componenteController.getComponenteById = getComponenteById

const postComponente = async (req,res) => {
    const { nombre, descripcion } = req.body
    try {
      const componente = await Componente.create({   
        nombre,   
        descripcion,
    })
    res.status(201).json(componente);  
    } 
    catch (error) {
        res.status(400).json({message: "Error en la creación del componente"})
    }  
}

componenteController.postComponente = postComponente

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

componenteController.updateComponente = updateComponente

const deleteComponente = async (req,res) => {
    const componente = req.modelo || await Componente.findByPk(req.params.id);
    const cantProductosAsociados = await componente.countProductos()
    if(cantProductosAsociados > 0) {
        res.status(400).json({ message: `no se puede eliminar un componente si tiene productos asociados` });
        return
    }
    try {
        await Componente.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: 'Componente eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

componenteController.deleteComponente = deleteComponente

const getProductosByComponenteId = async(req, res) => {
    const idComponente = req.params.id
    res.status(200).json(await Componente.findOne({
        where:{idComponente},
        include: [
            {
                model: Producto,
                as: 'Productos',
                through:{
                    attributes: []
                }
            }
        ]
    }))
}

componenteController.getProductosByComponenteId = getProductosByComponenteId

module.exports = componenteController