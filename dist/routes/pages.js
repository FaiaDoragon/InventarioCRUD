"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pages_1 = require("../controller/pages");
const router = (0, express_1.Router)();
router.get('/', pages_1.loginPage);
router.get('/panelcontrol', pages_1.controlPage);
exports.default = router;
//# sourceMappingURL=pages.js.map