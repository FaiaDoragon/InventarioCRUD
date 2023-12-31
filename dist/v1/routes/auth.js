"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../controller/auth");
const admin_1 = require("../../controller/admin");
const validarjwt_1 = require("../../middlewares/validarjwt");
const router = (0, express_1.Router)();
router.post('/login', auth_1.loginAuth);
//router.get('/validator', validarJWT, renovarToken );
//router.post('/register', crearAdmin );
router.put('/update/:id', validarjwt_1.validarJWT, admin_1.actualizarAdmin);
exports.default = router;
//# sourceMappingURL=auth.js.map