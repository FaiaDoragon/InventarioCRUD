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
 * /:
 *   get:
 *     summary: login Page
 *     tags:
 *       - Pages
 *     responses:
 *       200:
 *         description: OK (Pagina de inicio de sesion)
 * /panelcontrol:
 *   get:
 *     summary: Panel de Control
 *     tags:
 *       - Pages
 *     responses:
 *       200:
 *         description: OK (Pagina de Panel de Control)
 *         content:
 * /api/admin/login:
 *   post:
 *     summary: Inicio de sesion
 *     tags:
 *       - Auth
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  example:
 *                      USUARIO: admin
 *                      PASSWORD: admin
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *                  token: token
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             example:
 *                  msg: Usuario o Contraseña invalidos
 *       500:
 *         description: Not Found
 *         content:
 *           application/json:
 *             example:
 *                  msg: hubo un error comuniquese con el administrador
 *
 * /api/admin/update/{id}:
 *   put:
 *     tags:
 *       - Auth
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Identificador único
 *         required: true
 *     requestBody:
 *         required: true
 *         content:
 *             application/json:
 *                 example:
 *                      {
 *                        "NOMBRE": "NOMBRE",
 *                        "APELLIDO": "APELLIDO",
 *                        "USUARIO": "usuario",
 *                        "PASSWORD": password
 *                      }
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *                  msg: Admin Actualizado
 *                  administrador: {
 *                                   "NOMBRE": "NOMBRE",
 *                                   "APELLIDO": "APELLIDO",
 *                                   "USUARIO": "usuario"
 *                                 }
 * /api/admin/productos:
 *  get:
 *     summary: Obtener un listado de todos los productos
 *     tags:
 *       - Productos
 *     security:
 *       - ApiKeyAuth: []
 *     responses:
 *       200:
 *         description: OK (Lista de Todos los Productos registrados)
 *         content:
 *           application/json:
 *             example:
 *                 productos: [{
 *                              "ID": numeroID,
 *                              "ESTADO": true,
 *                              "NOMBRE": "NOMBRE DEL PRODUCTO",
 *                              "MARCA": "MARCA DEL PRODUCTO",
 *                              "IMG": "IMAGEN.img",
 *                              "PRECIO": "PRECIO DEL PRODUCTO",
 *                              "STOCK": STOCK DEL PRODUCTO,
 *                              "TALLA": "TALLA DE SER NECESARIA",
 *                              "COLOR": "COLOR DEL PRODUCTO",
 *                              "createdAt": "FECHA DE CREACION",
 *                              "updatedAt": "FECHA DE MODIFICACION"
 *                          }, {
 *                              "ID": numeroID,
 *                              "ESTADO": true,
 *                              "NOMBRE": "NOMBRE DEL PRODUCTO",
 *                              "MARCA": "MARCA DEL PRODUCTO",
 *                              "IMG": "IMAGEN.img",
 *                              "PRECIO": "PRECIO DEL PRODUCTO",
 *                              "STOCK": STOCK DEL PRODUCTO,
 *                              "TALLA": "TALLA DE SER NECESARIA",
 *                              "COLOR": "COLOR DEL PRODUCTO",
 *                              "createdAt": "FECHA DE CREACION",
 *                              "updatedAt": "FECHA DE MODIFICACION"
 *                          }]
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NoFound'
 *  post:
 *      summary: Crear un producto
 *      tags:
 *       - Productos
 *      security:
 *       - ApiKeyAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  example:
 *                      {
 *                       "NOMBRE": "NOMBRE DEL PRODUCTO",
 *                       "MARCA": "MARCA DEL PRODUCTO",
 *                       "IMG": "IMAGEN.img",
 *                       "PRECIO": "PRECIO DEL PRODUCTO",
 *                       "STOCK": STOCK DEL PRODUCTO,
 *                       "TALLA": "TALLA DE SER NECESARIA",
 *                       "COLOR": "COLOR DEL PRODUCTO",
 *                       }
 *      responses:
 *          201:
 *              description: Ok - Producto Creado
 *              content:
 *                  application/json:
 *                      example:
 *                          msg: "Producto creado exitosamente"
 *                          Producto: {
 *                              "ID": numeroID,
 *                              "ESTADO": true,
 *                              "NOMBRE": "NOMBRE DEL PRODUCTO",
 *                              "MARCA": "MARCA DEL PRODUCTO",
 *                              "IMG": "IMAGEN.img",
 *                              "PRECIO": "PRECIO DEL PRODUCTO",
 *                              "STOCK": STOCK DEL PRODUCTO,
 *                              "TALLA": "TALLA DE SER NECESARIA",
 *                              "COLOR": "COLOR DEL PRODUCTO",
 *                              "createdAt": "FECHA DE CREACION",
 *                              "updatedAt": "FECHA DE MODIFICACION"
 *                          }
 *          500:
 *              description: Error al crear producto
 *              content:
 *                  application/json:
 *                      example:
 *                          msg: "Error al crear producto"
 *                          error: error.message
 * /api/admin/productos/{id}:
 *  get:
 *     summary: Obtener producto por Id
 *     tags:
 *       - Productos
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Identificador único
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *                  msg: "producto encontrado"
 *                  producto: {
 *                              "ID": numeroID,
 *                              "ESTADO": true,
 *                              "NOMBRE": "NOMBRE DEL PRODUCTO",
 *                              "MARCA": "MARCA DEL PRODUCTO",
 *                              "IMG": "IMAGEN.img",
 *                              "PRECIO": "PRECIO DEL PRODUCTO",
 *                              "STOCK": STOCK DEL PRODUCTO,
 *                              "TALLA": "TALLA DE SER NECESARIA",
 *                              "COLOR": "COLOR DEL PRODUCTO",
 *                              "createdAt": "FECHA DE CREACION",
 *                              "updatedAt": "FECHA DE MODIFICACION"
 *                          }
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/NoFoudId'
 *  put:
 *      summary: Actualizar Producto por Id
 *      tags:
 *       - Productos
 *      security:
 *       - ApiKeyAuth: []
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Identificador único
 *          required: true
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  example: {
 *                              "ID": "",
 *                              "NOMBRE": "",
 *                              "MARCA": "",
 *                              "IMG": "",
 *                              "PRECIO": "",
 *                              "STOCK": "",
 *                              "TALLA": "",
 *                              "COLOR": "",
 *                          }
 *      responses:
 *          200:
 *              description: Ok - Producto Actualizado
 *              content:
 *                  application/json:
 *                      example:
 *                          msg: Producto Actualizado correctamente
 *                          producto: {
 *                              "ID": numeroID,
 *                              "ESTADO": true,
 *                              "NOMBRE": "NOMBRE DEL PRODUCTO",
 *                              "MARCA": "MARCA DEL PRODUCTO",
 *                              "IMG": "IMAGEN.img",
 *                              "PRECIO": "PRECIO DEL PRODUCTO",
 *                              "STOCK": STOCK DEL PRODUCTO,
 *                              "TALLA": "TALLA DE SER NECESARIA",
 *                              "COLOR": "COLOR DEL PRODUCTO",
 *                              "createdAt": "FECHA DE CREACION",
 *                              "updatedAt": "FECHA DE MODIFICACION"
 *                          }
 *          404:
 *              $ref: '#/components/responses/NoFoudId'
 *          500:
 *              $ref: '#/components/responses/Server'
 *
 *  delete:
 *      summary: Descontinuidad de Producto
 *      tags:
 *       - Productos
 *      security:
 *       - ApiKeyAuth: []
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Identificador único
 *          required: true
 *      responses:
 *          200:
 *              description: Ok - Estado cambiado a false/truex`
 *              content:
 *                  application/json:
 *                      example:
 *                          false:
 *                              msg: Estado cambiado a false
 *                              producto: {
 *                                  "ID": numeroID,
 *                                  "ESTADO": false,
 *                                  "NOMBRE": "NOMBRE DEL PRODUCTO",
 *                                  "MARCA": "MARCA DEL PRODUCTO",
 *                                  "IMG": "IMAGEN.img",
 *                                  "PRECIO": "PRECIO DEL PRODUCTO",
 *                                  "STOCK": STOCK DEL PRODUCTO,
 *                                  "TALLA": "TALLA DE SER NECESARIA",
 *                                  "COLOR": "COLOR DEL PRODUCTO",
 *                                  "createdAt": "FECHA DE CREACION",
 *                                  "updatedAt": "FECHA DE MODIFICACION"
 *                              }
 *                          true:
 *                              msg: Estado cambiado a true
 *                              producto: {
 *                                  "ID": numeroID,
 *                                  "ESTADO": true,
 *                                  "NOMBRE": "NOMBRE DEL PRODUCTO",
 *                                  "MARCA": "MARCA DEL PRODUCTO",
 *                                  "IMG": "IMAGEN.img",
 *                                  "PRECIO": "PRECIO DEL PRODUCTO",
 *                                  "STOCK": STOCK DEL PRODUCTO,
 *                                  "TALLA": "TALLA DE SER NECESARIA",
 *                                  "COLOR": "COLOR DEL PRODUCTO",
 *                                  "createdAt": "FECHA DE CREACION",
 *                                  "updatedAt": "FECHA DE MODIFICACION"
 *                              }
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          404:
 *              $ref: '#/components/responses/NoFoudId'
 *          500:
 *              $ref: '#/components/responses/Server'
 * /api/admin/productos/d/{id}:
 *  delete:
 *      summary: Eliminacion definitiva de producto
 *      tags:
 *       - Productos
 *      security:
 *       - ApiKeyAuth: []
 *      parameters:
 *        - name: id
 *          in: path
 *          description: Identificador único
 *          required: true
 *      responses:
 *          200:
 *              description: Ok - Producto eliminado de la base de datos
 *              content:
 *                  application/json:
 *                      example:
 *                          msg: 'producto con el id: ${id} eliminado definitivamente'
 *
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          404:
 *              $ref: '#/components/responses/NoFoudId'
 *          500:
 *              $ref: '#/components/responses/Server'
 */
/**
 * @openapi
 * components:
 *      securitySchemes:
 *          ApiKeyAuth:
 *              type: apiKey
 *              in: header
 *              name: x-token
 *      schemas:
 *          Productos:
 *              type: object
 *              properties:
 *                  ID:
 *                    type: number
 *                    example: 35
 *                  NOMBRE:
 *                    type: string
 *                    example: CAMISA
 *                  ESTADO:
 *                    type: boolean
 *                    example: true
 *                  MARCA:
 *                    type: string
 *                    example: GUCCI
 *                  IMG:
 *                    type: string
 *                    example: loquesea.img
 *                  STOCK:
 *                    type: number
 *                    example: 100
 *                  TALLA:
 *                    type: string
 *                    example: XL
 *                  COLOR:
 *                    type: string
 *                    example: BLANCO
 *                  PRECIO:
 *                    type: float
 *                    example: 55.45
 *                  createdAt:
 *                    type: string
 *                    example: 4/20/2022, 2:21:56 PM
 *                  updatedAt:
 *                    type: string
 *                    example: 4/20/2022, 2:21:56 PM
 *          Admin:
 *              type: object
 *              properties:
 *                  ID:
 *                      type: number
 *                      example: 4
 *                  NOMBRE:
 *                      type: string
 *                      example: FULANO
 *                  APELLIDO:
 *                      type: string
 *                      example: SEGUNDO
 *                  USUARIO:
 *                      type: string
 *                      example: admin
 *                  PASSWORD:
 *                      type: varchar
 *                      example: $2a$10$jryxuG64nRAKdjCdEvCvG.Ecc7ZdCr8kZ9xVjdrZFXaYbbe0W5f3K
 *                  ESTADO:
 *                      type: boolean
 *                      example: true
 *                  EDAD:
 *                      type: number
 *                      example: 25
 *      responses:
 *          UnauthorizedError:
 *              description: Error en la Autorizacion
 *              content:
 *                  application/json:
 *                      example:
 *                          error1:
 *                              msg: "No hay token en la peticion"
 *                          error2:
 *                              msg: "token no valido - usuario con estado false"
 *                          error3:
 *                              msg: "Vuelva a iniciar sesion por favor"
 *          NoFound:
 *              description: Datos no encontrados
 *              content:
 *                  application/json:
 *                      example:
 *                          msg: "No se encontraron los datos solicitados"
 *          NoFoudId:
 *              description: Datos no encontrados
 *              content:
 *                  application/json:
 *                      example:
 *                          error1:
 *                              msg: "Debe enviar un id Valido"
 *                          error2:
 *                              msg: "No se encontro producto con el id suministrado"
 *          Server:
 *              description: Server error, comuniquese con el admin
 *              content:
 *                  application/json:
 *                      example:
 *                          msg: Comuniquese con el Administrador
 *                          error: error.message
 *
 *
 */ 
//# sourceMappingURL=productos.js.map