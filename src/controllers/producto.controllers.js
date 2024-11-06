const {Producto, Componente, Fabricante } = require('../db/models')

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
    const producto = await Producto.findByPk(id)
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
        res.status(201).json(producto)
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
    const modelo = req.modelo || await Producto.findByPk(req.params.id);
    const cantComponentesAsociados = await modelo.countComponentes()
    if(cantComponentesAsociados > 0) {
        res.status(400).json({ message: `no se puede eliminar un producto si tiene componentes asociados` });
        return
    }
    const cantFabricantesAsociados = await modelo.countFabricantes()
    if(cantFabricantesAsociados > 0) {
        res.status(400).json({ message: `no se puede eliminar un producto si tiene fabricantes asociados` });
        return
    }
    try {
        await Producto.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
productoController.deleteProducto = deleteProducto

const getFabricantesById = async(req, res) => {
    const idProducto = req.params.id
    const producto = await Producto.findByPk(idProducto, {
        include: { model: Fabricante }
    });
    res.status(200).json(producto);
}
productoController.getFabricantesById = getFabricantesById


//Asociar un fabricante a un producto
const associateFabricanteById= async (req,res) => {
    try{
        const id = req.params.id // ID producto
        const {nombre, direccion, numeroContacto, pathImgPerfil} = req.body  // ID fabricante
        const producto = await Producto.findByPk(id) 
        const fabricante = await Fabricante.create({nombre, direccion, numeroContacto, pathImgPerfil})
        producto.addFabricantes(fabricante)
        res.status(201).json({message: 'Fabricante agregado al producto'})
    }
    catch (error) {
        res.status(404).json({message: "Error al agregar un fabricante al producto"})
    }
}
productoController.associateFabricanteById = associateFabricanteById
/* 
Profe intente hacerlo con promesas para agregar de a varios pero no me funciono, 
nose porque, lo dejo si lo quiere revisar.

const associateFabricanteById = async (req, res) => {
    const arrayFabricantes = req.body
    const id = req.params.id
    const producto = await Producto.findByPk(id) 
     
    let promesas = [];
    arrayFabricantes.forEach(fabricante => {
        promesas.push( Fabricante.create(fabricante) )
    });
    const fabricantes = await Promise.all(promesas)
    producto.addFabricantes(fabricantes)
    res.status(201).json({message: 'Fabricante agregado al producto'})
}
*/



//Asociar un componente a un producto
const associateComponenteById = async (req, res) => {  
    try{
        const id = req.params.id // id producto
        const {nombre, descripcion} = req.body  // id componente
        const producto = await Producto.findByPk(id) 
        const componente = await Componente.create({nombre, descripcion})
        producto.addComponentes(componente)
        res.status(201).json({message: 'Componente agregado al producto'})
    }
    catch (error) {
        res.status(404).json({message: "Error al agregar un componente al producto"})
    }
}

productoController.associateComponenteById = associateComponenteById

const getComponentesById = async(req, res) => {
    const idProducto = req.params.id
    try {  
        const idProducto = req.params.id
        const producto = await Producto.findByPk(idProducto, {
            include: { model: Componente }
        });
        res.status(200).json(producto);

    } catch (error) {  
        console.error(error);  
        res.status(404).json({message: 'No se encontró el componente'});  
    }
}
productoController.getComponentesById = getComponentesById



module.exports = productoController