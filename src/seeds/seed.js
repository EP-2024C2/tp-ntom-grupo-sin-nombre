const sequelize = require('../config/database')
const { Producto, Fabricante, Componente } = require('../db/models')

async function seed() {
    try {
        // Sincronizar la base de datos (recrear las tablas si no existen)
        await sequelize.sync({ force: true })
        console.log('Base de datos sincronizada')

        // ------------------------
        // Ejemplos de productos, compoenentes y fabricantes
        // ------------------------

        // Crear fabricantes
        const fabricante1 = await Fabricante.create({
            nombre: 'Dicomeré',
            direccion: '1234 Elm Street',
            numeroContacto: '123-456-7890',
            pathImgPerfil: 'images/fabricantes/techcorp.jpg'
        })

        const fabricante2 = await Fabricante.create({
            nombre: 'Cachafaz',
            direccion: '5678 Oak Avenue',
            numeroContacto: '098-765-4321',
            pathImgPerfil: 'images/fabricantes/innovatech.jpg'
        })

        const fabricante3 = await Fabricante.create({
            nombre: 'Grün',
            direccion: '9012 Maple Drive',
            numeroContacto: '321-654-9870',
            pathImgPerfil: 'images/fabricantes/futureworks.jpg'
        })

        const fabricante4 = await Fabricante.create({
            nombre: 'Las brisas',
            direccion: '3456 Pine Lane',
            numeroContacto: '111-222-3333',
            pathImgPerfil: 'images/fabricantes/megasolutions.jpg'
        })
        const fabricante5 = await Fabricante.create({
            nombre: 'PampaGourmet',
            direccion: '3656 San Justo',
            numeroContacto: '111-564-3333',
            pathImgPerfil: 'images/fabricantes/megasolutions.jpg'
        })

        const fabricante6 = await Fabricante.create({
            nombre: 'Bamboo',
            direccion: '3555 Casas',
            numeroContacto: '323-434-555',
            pathImgPerfil: 'images/fabricantes/megasolutions.jpg'
        })
        const fabricante7 = await Fabricante.create({
            nombre: 'Roapipó',
            direccion: '4444 Vergara',
            numeroContacto: '888-555-222',
            pathImgPerfil: 'images/fabricantes/megasolutions.jpg'
        })

        // Crear componentes
        const componente1 = await Componente.create({
            nombre: 'Cacao',
            descripcion: 'Cacao puro 100% natural.'
        })

        const componente2 = await Componente.create({
            nombre: 'Azúcar orgánica',
            descripcion: 'Azucar saludable.'
        })

        const componente3 = await Componente.create({
            nombre: 'Harina integral',
            descripcion: 'Alimento integral de salvado.'
        })

        const componente4 = await Componente.create({
            nombre: 'Sal marina',
            descripcion: 'Condimento a base de cloruro de sodio.'
        })

        // Crear productos
        const producto1 = await Producto.create({
            nombre: 'Azúcar orgánica',
            descripcion: 'Azúcar orgánica libre de agrotóxicos.',
            precio: 150.0,
            pathImg: 'images/productos/termostato.jpg'
        })

        const producto2 = await Producto.create({
            nombre: 'Grisines Orgánicos',
            descripcion: 'Grisines Orgánicos con lino y chía.',
            precio: 200.0,
            pathImg: 'images/productos/smartwatch.jpg'
        })

        const producto3 = await Producto.create({
            nombre: 'Jugo de Naranja',
            descripcion: 'Jugo de Naranja orgánico sin azúcar agregado.',
            precio: 80.0,
            pathImg: 'images/4.jpg'
        })

        const producto4 = await Producto.create({
            nombre: 'Mayonesa vegana',
            descripcion: 'Mayonesa vegana orgánica sin TACC.',
            precio: 120.0,
            pathImg: 'images/productos/controlador-riego.jpg'
        })

        const producto5 = await Producto.create({
            nombre: 'Tallarines',
            descripcion: 'Pasta orgánica integral elaborada con tomates orgánicos.',
            precio: 250.0,
            pathImg: 'images/productos/camara-seguridad.jpg'
        })

        const producto6 = await Producto.create({
            nombre: 'Pochoclos',
            descripcion: 'Pochoclos orgánicos con azúcar orgánica y un toque de sal marina.',
            precio: 300.0,
            pathImg: 'images/productos/control-acceso.jpg'
        })

        const producto7 = await Producto.create({
            nombre: 'Yerba mate orgánica',
            descripcion: 'Yerba mate orgánica con hierbas naturales.',
            precio: 100.0,
            pathImg: 'images/productos/altavoz-inteligente.jpg'
        })

        const producto8 = await Producto.create({
            nombre: 'Miel',
            descripcion: 'Miel orgánica suave y equilibrada.',
            precio: 180.0,
            pathImg: 'images/productos/camara-accion.jpg'
        })

        // Asociar fabricantes a productos
        await producto1.addFabricantes([fabricante1, fabricante2])
        await producto2.addFabricante(fabricante3)
        await producto3.addFabricantes([fabricante1, fabricante4])
        await producto4.addFabricante(fabricante2)
        await producto5.addFabricantes([fabricante3, fabricante4])
        await producto6.addFabricante(fabricante1)
        await producto7.addFabricante(fabricante2)
        await producto8.addFabricante(fabricante3)

        // Asociar componentes a productos
        await producto1.addComponentes([componente1, componente2])
        await producto2.addComponentes([componente2, componente3])
        await producto3.addComponentes([componente1, componente4])
        await producto4.addComponentes([componente3])
        await producto5.addComponentes([componente2, componente4])
        await producto6.addComponentes([componente1])
        await producto7.addComponentes([componente3, componente4])
        await producto8.addComponentes([componente4])

        console.log('Base de datos poblada con datos de ejemplo')
    } catch (error) {
        console.error('Error al poblar la base de datos:', error)
    }
}

module.exports = seed