[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/NoutYWiV)
# Tecnologías utilizadas 

- nodejs
- express
- sequelize
- sqlite

# Requisitos

- Node.js

- sqlite

## Instalación y configuración del proyecto

- Utilizando git clonar el repositorio https://github.com/EP-2024C2/tp-ntom-grupo-sin-nombre.git

- Asegurarse estar dentro de la carpeta tp-ntom-grupo-sin-nombre

- Instalar dependencias (npm install)

- Descomentar la línea de código en el archivo app //db.sequelize.sync({force:true})

- Iniciar aplicación (npm run dev)

## Diagrama de entidad-relacion (DER)

![DER](DER.png)

### Descripción del modelo DER
- Un **Producto** puede tener muchos fabricantes, y un **Fabricante** puede fabricar muchos productos.
- Un **Producto** puede tener muchos componentes, y un **Componente** puede formar parte de varios productos.

## ENDPOINTS

|Verbo|Recurso|Status code|Descripción|
|-----|-------|-----------|-----------|
| GET   | /productos | 200 | Obtener todos los productos |
| GET   | /productos/:id | 200, 404 | Obtener un producto en particular |
| POST  | /productos | 201, 400 | Crear un producto |
| PUT   | /productos/:id | 200, 404 | Modificar los datos de un producto en particular |
| DELETE| /productos/:id | 200, 404, 500 | Borrar un producto en particular |
| POST  | /productos/:id/fabricantes | 201, 404, 400 | Crear la asociación de producto con 1 o N fabricantes |
| GET   | /productos/:id/fabricantes | 200, 404 | Obtener todos los fabricantes de un producto |
| POST  | /productos/:id/componentes | 201, 404, 400 | Crear la asociación de producto con 1 o N componentes |
| GET   | /productos/:id/componentes | 200, 404 | Obtener todos los componentes de un producto |
| GET   | /fabricantes | 200 | Obtener todos los fabricantes |
| GET   | /fabricantes/:id | 200, 404 | Obtener un fabricante en particular |
| POST  | /fabricantes | 201, 400 | Crear un fabricante |
| PUT   | /fabricantes/:id | 200, 404 | Modificar los datos de un fabricante en particular |
| DELETE| /fabricantes/:id | 200, 404, 500 | Borrar un fabricante en particular |
| GET   | /fabricantes/:id/productos | 200, 404 | Obtener todos los productos de un fabricante |
| GET   | /componentes | 200 | Obtener todos los componentes |
| GET   | /componentes/:id | 200, 404 | Obtener un componente en particular |
| POST  | /componentes | 201, 400 | Crear un componente |
| PUT   | /componentes/:id | 200, 404 | Modificar los datos de un componente en particular |
| DELETE| /componentes/:id | 200, 404, 500 | Borrar un componente en particular |
| GET   | /componentes/:id/productos | 200, 404 | Obtener todos los productos de un componente |






