import { Router } from "express";
import { ExpressValidator } from "express-validator";

import { crearProducto, 
    obtenerProductos, 
    obtenerProducto, 
    actualizarProducto, 
    borrarProducto, 
    eliminarProducto } from "../controller/productos";



const router = Router();

router.get('/', obtenerProductos )
router.post('/', crearProducto )
router.get('/:id', obtenerProducto )
router.put('/:id', actualizarProducto )
router.delete('/:id', borrarProducto )
router.delete('/d/:id', eliminarProducto )

export default router;