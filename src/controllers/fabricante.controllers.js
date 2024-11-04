const { Fabricante, Producto_Fabricante} = require('../db/models')

const fabricanteController = {}

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


const updateFabricante = async (req, res) => {
    const { nombre, direccion, numeroContacto, pathImgPerfil } = req.body
    try {
        const id = req.params.id
        const fabricante = await Fabricante.findByPk(id)
        fabricante.nombre = nombre;
        fabricante.direccion = direccion;
        fabricante.numeroContacto = numeroContacto;
        fabricante.pathImgPerfil = pathImgPerfil
        await fabricante.save()
        res.status(200).json(fabricante)
    }
    catch (error) {
        res.status(404).json({message: "Error al modificar los datos del fabricante"})
    }
}
fabricanteController.updateFabricante = updateFabricante


const deleteFabricante = async (req, res) => {
    try {
        const idFabric = req.params.id
        const r = await Fabricante.destroy( {where: {id:idFabric}})
        res.status(200).json({mensaje:  `filas afectados ${r}`})
    }
    catch (error) {
        res.status(404).json({message: "Error al eliminar fabricante"})
    }
}
fabricanteController.deleteFabricante = deleteFabricante

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