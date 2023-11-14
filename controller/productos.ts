import { Request, Response } from "express";
import { Producto } from '../models/entities';
import db from "../db/dbconnection";

export const obtenerProductos = async (req: Request, res: Response) => {

    const productos = await Producto.find()

    res.json({
        msg: "Lista completa de productos",
        productos
    })
}

export const crearProducto = async (req: Request, res: Response) => {

    const {
        nombre,
        marca,
        img,
        precio,
        stock,
        talla,
        color
    } = req.body;

    try {
        const producto = Producto.create({
            NOMBRE: nombre.toUpperCase(),
            MARCA: marca.toUpperCase(),
            IMG: img,
            PRECIO: precio,
            STOCK: stock,
            TALLA: talla.toUpperCase(),
            COLOR: color.toUpperCase()
        });

        await producto.save();

        return res.status(201).json({
            msg: 'Producto creado exitosamente',
            producto
        });
    } catch (error: any) {
        return res.status(500).json({
            error: 'Error al crear el producto',
            msg: error.message
        });
    }
}

export const obtenerProducto = async (req: Request, res: Response) => {

    const idString = req.params.id

    const id = parseInt(idString)

    if (Number.isNaN(id)) {
        return res.json({
            msg: `Debe enviar un id Valido`
        })
    }

    const productoId = await Producto.findOneBy({
        ID: id
    });

    if (!productoId) {
        return res.status(404).json({ msg: `No se encontro producto con el id:` })
    }

    res.status(200).json({
        msg: "producto encontrado",
        productoId
    })
}

export const actualizarProducto = async (req: Request, res: Response) => {

    const idString = req.params.id
    const { body } = req

    const id = parseInt(idString)

    if (Number.isNaN(id)) {
        return res.json({
            msg: `Debe enviar un id Valido`
        })
    }

    const productoDB = db.getRepository(Producto)

    try {
        const producto = await productoDB.findOneBy({
            ID: id
        })

        if (!producto) {
            return res.status(404).json({ msg: "No se encontro producto con el id suministrado" })
        }

        productoDB.merge(producto, body)

        await productoDB.save(producto);

        res.json({
            msg: "Producto Actualizado correctamente",
            producto,
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al actualizar el producto'
        });
    }


}

export const borrarProducto = async (req: Request, res: Response) => {

    const idString = req.params.id

    const id = parseInt(idString)

    if (Number.isNaN(id)) {
        return res.json({
            msg: `Debe enviar un id Valido`
        })
    }

    const productoDB = db.getRepository(Producto)

    try {

        const producto = await productoDB.findOneBy({
            ID: id
        })

        if (!producto) {
            return res.status(404).json({ msg: "No se encontro producto con el id suministrado" })
        }

        if (!producto.ESTADO) {
            productoDB.merge(producto, { ESTADO: true })
            await productoDB.save(producto);

            return res.json({
                msg: "Estado cambiado a true",
                producto
            })
        }

        productoDB.merge(producto, { ESTADO: false })

        await productoDB.save(producto);

        res.json({
            msg: "Estado cambiado a false",
            producto
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al borrar el producto'
        });
    }
}

export const eliminarProducto = async (req: Request, res: Response) => {

    const idString = req.params.id
    const id = parseInt(idString)

    if (Number.isNaN(id)) {
        return res.json({
            msg: `Debe enviar un id Valido`
        })
    }

    const productoDB = db.getRepository(Producto)

    try {
        
        await productoDB.delete({ID : id})

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al eliminar el producto'
        });
    }

    res.json({
        msg: `producto con el id: ${id} eliminado definitivamente`
    })
}
