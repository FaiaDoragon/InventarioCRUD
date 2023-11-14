"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productos_1 = require("../controller/productos");
const router = (0, express_1.Router)();
router.get('/', productos_1.obtenerProductos);
router.post('/', productos_1.crearProducto);
router.get('/:id', productos_1.obtenerProducto);
router.put('/:id', productos_1.actualizarProducto);
router.delete('/:id', productos_1.borrarProducto);
router.delete('/d/:id', productos_1.eliminarProducto);
exports.default = router;
//# sourceMappingURL=productos.js.map