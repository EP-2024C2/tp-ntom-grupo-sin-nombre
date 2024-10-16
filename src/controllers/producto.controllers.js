const {Producto, Producto_Fabricante } = require('../db/models')

const productoController = {}

const getProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll({})
        res.status(200).json(productos)
    }
    catch (error) {
        res.status(404).json({ error: 'Error al obtener productos' })
    }
}
productoController.getProductos = getProductos


const getProductosId = async (req, res) => {
    const id = req.params.id
    const producto = await Producto.find(p => p.id == id)
    if (producto){
        res.status(200).json(producto)
    }
    else {
        res.status(404).json({ mensaje: `El id ${id} no se encuentra.` })
    }
}
productoController.getProductosId = getProductosId


const createProducto = async (req, res) => {
    const {nombre, descripcion, precio, pathImg} = req.body
    try {
        const producto = await Producto.create({
            nombre,
            descripcion,
            precio,
            pathImg
        })
        res.status(201).json(serie)
    }
    catch (error) {
        res.status(400).json({message: "Error en la creación del producto"})
    }
}
productoController.createProducto = createProducto


const updateProducto = async (req, res) => {
    const {nombre, descripcion, precio, pathImg} = req.body
    try {
        const id = req.params.id
        const producto = await Producto.findByPk(id)
        producto.nombre = nombre;
        producto.descripcion = descripcion;
        producto.precio = precio;
        producto.pathImg = pathImg;
        await producto.save()
        res.status(200).json(producto)
    }
    catch (error) {
        res.status(404).json({message: "Error al modificar los datos del producto"})
    }
}
productoController.updateProducto = updateProducto


const deleteProducto = async (req, res) => {
    try {
        const idProducto = req.params.id
        const r = await Producto.destroy( {where: {id:idProducto}})
        res.status(200).json({mensaje:  `filas afectadas ${r}`})
    }
    catch (error) {
        res.status(404).json({message: "Error al eliminar producto"})
    }
}
productoController.deleteProducto = deleteProducto

const getFabricantesById = async(req, res) => {
    const id = req.params.id
    res.status(200).json(await Producto.findOne({
        where:{id},
        include: [
            {
                model: Fabricante,
                as: 'fabricantes',
                through:{
                    attributes: []
                }
            }
        ],
    }))
}
controller.getFabricantesById = getFabricantesById

const associateFabricanteById = async(req, res) => {
    const listaFabricantes = req.body
    const id = req.params.id
    const mensajes = []
    await Promise.all(
        listaFabricantes.map(async (fabricante) => {
            const existeRegistro = await Producto_Fabricante.findOne({where:{id_producto:id, id_fabricante: fabricante.id}})
            console.log(existeRegistro) 
            if(existeRegistro)
                mensajes.push(`El fabricante con el ID ${fabricante.id} ya esta asociado al producto con id ${id}`)
            else{
                await Producto_Fabricante.create({id_producto:id, id_fabricante: fabricante.id})
                mensajes.push(`El fabricante con el ID ${fabricante.id} se asocio al producto con id ${id}`)
            }
        }))

    const productoActualizado = await Producto.findOne({where:{id},include: [
            {model: Fabricante,as: 'fabricantes',through:{attributes: []}}
        ],})
    await res.status(200).json({mensajes, productoActualizado})
    }

controller.associateFabricanteById = associateFabricanteById

module.exports = productoController