const productos = []

class ProductService {
    constructor(fileName) {
        this.fileName = fileName
    }

    get = async (req, res) => {
        try {
            if (productos != 0) {
                res.send({ status: 'success', productos })
            } else {
                res.send({ message: 'No hay productos. Debe ingresar alguno previamente' })
            }
        } catch (err) {
            console.error('Error' + err)
        }

    }

    post = async (req, res) => {
        try {
            let producto = req.body
            if (!producto.nombre) {
                return res.status(400).send({ status: 'error', error: 'No se envio un nombre de producto' })
            }
            if (!producto.precio) {
                return res.status(400).send({ status: 'error', error: 'No se envio un precio de producto' })
            }
            if (!producto.thumbnail) {
                return res.status(400).send({ status: 'error', error: 'No se envio una url de producto' })
            }
            if (productos.length === 0) { //No existe o vacio
                producto.id = 1
                productos.push(producto)
                res.send({ status: 'success', message: `Producto añadido con id: ${producto.id}` })
            } else { // mas de un producto
                producto.id = productos[productos.length - 1].id + 1
                productos.push(producto)
                res.send({ status: 'success', message: `Producto añadido con id: ${producto.id}` })
            }
        } catch (err) {
            console.error('Error' + err)
        }


    }

    getById = async (req, res) => {
        try {
            const id = req.params.id
            if (isNaN(id)) {
                return res.status(400).send({ status: 'error', error: 'El valor ingresado no es un numero' })
            }
            if (parseInt(id) < 1) {
                return res.status(400).send({ status: 'error', error: 'id inválido' })
            }
            let productoEncontrado = productos.find((e) => {  //Producto encontrado
                return e.id === parseInt(id)
            })
            if (!productoEncontrado) {
                return res.status(400).send({ status: 'error', error: 'Producto no encontrado' })
            }
            return res.send({ status: 'success', data: productoEncontrado })

        } catch (err) {
            console.error('Error' + err)
        }

    }

    put = async (req, res) => {
        try {
            if (isNaN(req.params.id)) {
                return res.status(400).send({ status: 'error', error: 'El valor ingresado no es un numero' })
            }
            if (parseInt(req.params.id) < 1) {
                return res.status(400).send({ status: 'error', error: 'id inválido' })
            }
            // Decidí usar el findIndex porque me pareció mejor opción que trabajar con la
            // asocicación posición-id

            let oldProductIndex = productos.findIndex((e) => {
                return e.id === parseInt(req.params.id)
            })
            if (oldProductIndex === -1) {
                return res.status(400).send({ status: 'error', error: 'No hay resultado con ese valor ingresado' })
            }
            let oldProduct = productos[oldProductIndex]
            let nuevoProducto = { ...oldProduct, ...req.body }
            productos[oldProductIndex] = nuevoProducto
            res.send({ status: 'success', message: `Producto actualizado con id: ${nuevoProducto.id}` })


        } catch (err) {
            console.error('Error' + err)
        }

    }


    deleteById = async (req, res) => {
        try {
            if (isNaN(req.params.id)) {
                return res.status(400).send({ status: 'error', error: 'El valor ingresado no es un numero' })
            }
            if (parseInt(req.params.id) < 1) {
                return res.status(400).send({ status: 'error', error: 'No hay resultado con ese valor ingresado' })
            }
            if (productos.length === 0) {
                return res.status(400).send({ status: 'error', error: 'No hay resultado con ese valor ingresado' })
            }
            let productIndex = productos.findIndex((e) => {
                return e.id === parseInt(req.params.id)
            })
            if (productIndex === -1) {
                return res.status(400).send({ status: 'error', error: 'No hay resultado con ese valor ingresado' })
            }
            productos.splice(productIndex, 1)
            res.send({ status: 'success', message: 'producto eliminado' })


        } catch (err) {
            console.error('Error' + err)
        }

    }

}

export default ProductService