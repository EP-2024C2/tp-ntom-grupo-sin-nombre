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
        res.status(200).json({ message: 'OK' });
    } catch (error) {
        res.status(500).json({ error: error.message });
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

//Asociar un fabricante a un producto

const associateFabricanteById = async (req, res) => {
    const producto = req.modelo || await Producto.findByPk(req.params.id);
    const Lista_fabricantes = req.body;

    if (!Array.isArray(Lista_fabricantes)) {
        return res.status(500).json({ error: `Error de input: se esperaba un fabricante` })
    }

    for (const i in Lista_fabricantes) {
        const fabricante = await Fabricante.findByPk(Lista_fabricantes[i].id)
        if (!fabricante) {
            return res.status(404).json({ error: `El fabricante con el id '${Lista_fabricantes[i].id}' no se encuentra` });
        }
        Lista_fabricantes[i] = fabricante
    }
    
    try {
        producto.addFabricantes(Lista_fabricantes)
    } catch (error) {
        const mensaje = `Error al asignar fabricantes a un producto: '${err}'`
        console.error(mensaje)
        return res.status(500).json({ error: mensaje })
    }
    res.status(200).json({ message: 'Fabricante asociado con éxito' });
}
productoController.associateFabricanteById = associateFabricanteById

//Asociar un componente a un producto

const associateComponenteById = async (req, res) => {  
    const producto = req.modelo || await Producto.findByPk(req.params.id);

    const lista_componentes = req.body;
    if (!Array.isArray(lista_componentes)) {
        return res.status(500).json({ error: `Error de input: se esperaba un componente` })
    }
    for (const i in lista_componentes) {
        const componente = await Componente.findByPk(lista_componentes[i].id)
        if (!componente) {
            return res.status(404).json({ error: `El componente con el id '${lista_componentes[i].id}' no se encuentra` });
        }
        lista_componentes[i] = componente
    }

    try {
        producto.addComponentes(lista_componentes)
    } catch (err) {
        const msg = `error al asignar componentes a un producto: '${err}'`
        console.error(msg)
        return res.status(500).json({ error: msg })
    }

    res.status(200).json({ message: 'Componente asociado con éxito'});
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