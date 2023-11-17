"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarProducto = exports.borrarProducto = exports.actualizarProducto = exports.obtenerProducto = exports.crearProducto = exports.obtenerProductos = void 0;
const entities_1 = require("../models/entities");
const dbconnection_1 = __importDefault(require("../db/dbconnection"));
const obtenerProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productos = yield entities_1.Producto.find();
    if (!productos) {
        return res.status(404).json({ msg: "Lista completa de productos" });
    }
    res.status(200).json({
        // msg: "Lista completa de productos",
        productos
    });
});
exports.obtenerProductos = obtenerProductos;
const crearProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, marca, img, precio, stock, talla, color } = req.body;
    try {
        const producto = entities_1.Producto.create({
            NOMBRE: nombre.toUpperCase(),
            MARCA: marca.toUpperCase(),
            IMG: img,
            PRECIO: precio,
            STOCK: stock,
            TALLA: talla.toUpperCase(),
            COLOR: color.toUpperCase()
        });
        yield producto.save();
        return res.status(201).json({
            msg: 'Producto creado exitosamente',
            producto
        });
    }
    catch (error) {
        return res.status(500).json({
            error: 'Error al crear el producto',
            msg: error.message
        });
    }
});
exports.crearProducto = crearProducto;
const obtenerProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idString = req.params.id;
    const id = parseInt(idString);
    if (Number.isNaN(id)) {
        return res.json({
            msg: `Debe enviar un id Valido`
        });
    }
    const producto = yield entities_1.Producto.findOneBy({
        ID: id
    });
    if (!producto) {
        return res.status(404).json({ msg: `No se encontro producto con el id: ${id}` });
    }
    res.status(200).json({
        msg: "producto encontrado",
        producto
    });
});
exports.obtenerProducto = obtenerProducto;
const actualizarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idString = req.params.id;
    const { body } = req;
    const id = parseInt(idString);
    if (Number.isNaN(id)) {
        return res.json({
            msg: `Debe enviar un id Valido`
        });
    }
    const productoDB = dbconnection_1.default.getRepository(entities_1.Producto);
    try {
        const producto = yield productoDB.findOneBy({
            ID: id
        });
        if (!producto) {
            return res.status(404).json({ msg: "No se encontro producto con el id suministrado" });
        }
        productoDB.merge(producto, body);
        yield productoDB.save(producto);
        res.json({
            msg: "Producto Actualizado correctamente",
            producto,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al actualizar el producto'
        });
    }
});
exports.actualizarProducto = actualizarProducto;
const borrarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idString = req.params.id;
    const id = parseInt(idString);
    if (Number.isNaN(id)) {
        return res.json({
            msg: `Debe enviar un id Valido`
        });
    }
    const productoDB = dbconnection_1.default.getRepository(entities_1.Producto);
    try {
        const producto = yield productoDB.findOneBy({
            ID: id
        });
        if (!producto) {
            return res.status(404).json({ msg: `No se encontro producto con el id: ${id}` });
        }
        if (!producto.ESTADO) {
            productoDB.merge(producto, { ESTADO: true });
            yield productoDB.save(producto);
            return res.json({
                msg: "Estado cambiado a true",
                producto
            });
        }
        productoDB.merge(producto, { ESTADO: false });
        yield productoDB.save(producto);
        res.json({
            msg: "Estado cambiado a false",
            producto
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al borrar el producto'
        });
    }
});
exports.borrarProducto = borrarProducto;
const eliminarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idString = req.params.id;
    const id = parseInt(idString);
    if (Number.isNaN(id)) {
        return res.json({
            msg: `Debe enviar un id Valido`
        });
    }
    const productoDB = dbconnection_1.default.getRepository(entities_1.Producto);
    try {
        yield productoDB.delete({ ID: id });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al eliminar el producto'
        });
    }
    res.json({
        msg: `producto con el id: ${id} eliminado definitivamente`
    });
});
exports.eliminarProducto = eliminarProducto;
//# sourceMappingURL=productos.js.map