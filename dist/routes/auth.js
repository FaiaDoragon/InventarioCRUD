"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controller/auth");
const admin_1 = require("../controller/admin");
const router = (0, express_1.Router)();
router.post('/login', auth_1.loginAuth);
router.post('/register', admin_1.crearAdmin);
router.put('/passupdate/:id', admin_1.actualizarAdmin);
exports.default = router;
//# sourceMappingURL=auth.js.map