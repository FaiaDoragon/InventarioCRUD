"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productos_1 = require("../../controller/productos");
const validarjwt_1 = require("../../middlewares/validarjwt");
const router = (0, express_1.Router)();
router.get('/', validarjwt_1.validarJWT, productos_1.obtenerProductos);
router.post('/', validarjwt_1.validarJWT, productos_1.crearProducto);
router.get('/:id', validarjwt_1.validarJWT, productos_1.obtenerProducto);
router.put('/:id', validarjwt_1.validarJWT, productos_1.actualizarProducto);
router.delete('/:id', validarjwt_1.validarJWT, productos_1.borrarProducto);
router.delete('/d/:id', validarjwt_1.validarJWT, productos_1.eliminarProducto);
exports.default = router;
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
//# sourceMappingURL=productos.js.map