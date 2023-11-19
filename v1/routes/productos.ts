import { Router } from "express";

import {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto,
    eliminarProducto
} from "../../controller/productos";
import { validarJWT } from "../../middlewares/validarjwt";

const router = Router();

router.get('/', validarJWT, obtenerProductos)
router.post('/', validarJWT, crearProducto)
router.get('/:id', validarJWT, obtenerProducto)
router.put('/:id', validarJWT, actualizarProducto)
router.delete('/:id', validarJWT, borrarProducto)
router.delete('/d/:id', validarJWT, eliminarProducto)

export default router;

/**
 * @openapi
 * /api/admin/productos:
 *   get:
 *     tags:
 *       - Productos
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema: 
 *               type: object
 *               properties:
 *                 header:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */