const { Fabricante, Producto_Fabricante} = require('../db/models')

const fabricanteController = {}

// devuelve todos los fabricantes
const getFabricantes = async (req, res) => {
    try {
        const fabricantes = await Fabricante.findAll({})
        res.status(200).json(fabricantes)
    }
    catch (error) {
        res.status(404).json({ error: 'Error al obtener fabricantes' })
    }
}
fabricanteController.getFabricantes = getFabricantes

// devuelve un fabricante por id
const getFabricanteId = async (req, res) => {
    const id = req.params.id
    const fabricante = await Fabricante.findByPk(id)
    if (fabricante){
        res.status(200).json(fabricante)
    }
    else {
        res.status(404).json({ mensaje: `El id ${id} no se encuentra.` })
    }
}
fabricanteController.getFabricanteId = getFabricanteId

//crea un fabricante
const createFabricante = async (req, res) => {
    const { nombre, direccion, numeroContacto, pathImgPerfil } = req.body
    try {
        const fabricante = await Fabricante.create({
            nombre,
            direccion,
            numeroContacto,
            pathImgPerfil
        })
        res.status(201).json(fabricante)
    }
    catch (error) {
        res.status(400).json({message: "Error en la creación del fabricante"})
    }
}
fabricanteController.createFabricante = createFabricante

// actualiza datos de un fabricante
const updateFabricante = async (req, res) => {
    const fabricanteActualizado = req.body;
    try {
        await Fabricante.update({
            nombre: fabricanteActualizado.nombre,
            direccion: fabricanteActualizado.direccion,
            numeroContacto: fabricanteActualizado.numeroContacto,
            pathImgPerfil: fabricanteActualizado.pathImgPerfil,
        }, { where: { id: req.params.id } })
        const fabricanteModificado = await Fabricante.findByPk(req.params.id);
        res.status(200).json(fabricanteModificado)

    } catch (error) {
        res.status(500).json({ error: `error al intentar crear: "${error}"` })
    }
}
fabricanteController.updateFabricante = updateFabricante

// elimina un fabricante
const deleteFabricante = async (req, res) => {
    const fabricante = req.modelo || await Fabricante.findByPk(req.params.id);
    const cantProductosAsociados = await fabricante.countProductos()
    if(cantProductosAsociados > 0) {
        res.status(400).json({ message: `no se puede eliminar un fabricante si tiene productos asociados` });
        return
    }

    try {
        await Fabricante.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: 'Fabricante eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
fabricanteController.deleteFabricante = deleteFabricante

//devuelve los productos de un fabricante
const getProductosByFabricanteId = async(req, res) => {
    const idFabricante = req.params.id
    res.status(200).json(await Fabricante.findOne({
        where:{idFabricante},
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
fabricanteController.getProductosByFabricanteId = getProductosByFabricanteId


module.exports = fabricanteController