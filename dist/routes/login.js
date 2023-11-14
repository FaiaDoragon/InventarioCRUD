"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_1 = require("../controller/login");
const router = (0, express_1.Router)();
router.post('/auth', login_1.loginAuth);
router.put('/', login_1.actualizarAdmin);
exports.default = router;
//# sourceMappingURL=login.js.map