const {Producto, Producto_Fabricante, Producto_Componente } = require('../db/models')

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
        res.status(404).json({ mensaje: `El producto de id ${id} no se encuentra.` })
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
productoController.getFabricantesById = getFabricantesById

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

productoController.associateFabricanteById = associateFabricanteById

const associateComponenteById = async (req, res) => {  
    const listaComponentes = req.body;  
    const id = req.params.id;  
    const mensajes = [];  

    try {  
        if (!Array.isArray(listaComponentes) || listaComponentes.length === 0) {  
            return res.status(400).json({ message: 'No existe lista de componentes' });  
        }  

        await Promise.all(  
            listaComponentes.map(async (componente) => {  
                const existeRegistro = await Producto_Componente.findOne({  
                    where: {id_producto: id, id_componente: componente.id}  
                });  

                if (existeRegistro) {  
                    mensajes.push(`El componente con el ID ${componente.id} ya está asociado al curso con id ${id}`);  
                } else {  
                    await Producto_Componente.create({ id_producto: id, id_componente: componente.id });  
                    mensajes.push(`El componente con el ID ${componente.id} se asoció al curso con id ${id}`);  
                }  
            })  
        );  

        const prodActualizado = await Producto.findOne({  
            where: {id},  
            include: [  
                {model: Componente, as: 'componentes', through: {attributes: []}}  
            ],  
        });  

        return res.status(200).json({ mensajes, prodActualizado });  
    } catch (error) {  
        console.error(error);  
        return res.status(500).json({ message: 'Error al obtener componentes' });  
    }  
};  

productoController.associateComponenteById = associateComponenteById;  

const getComponentesById = async(req, res) => {
    const id = req.params.id
    try {  
        const componente = await Producto.findOne({  
            where: {id},  
            include: [{model: Componente,as: 'componentes', through: {attributes: []}}],  
        }); 
        res.status(200).json(componente);  
    } catch (error) {  
        console.error(error);  
        res.status(404).json({message: 'No se encontró el componente'});  
    }
}
productoController.getComponentesById = getComponentesById



module.exports = productoController