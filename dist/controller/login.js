"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarAdmin = exports.loginPage = exports.loginAuth = void 0;
const path_1 = __importDefault(require("path"));
const loginAuth = (req, res) => {
    res.status(200).sendFile(path_1.default.join(__dirname, '../../', 'public', 'controlpanel.html'));
};
exports.loginAuth = loginAuth;
const loginPage = () => {
};
exports.loginPage = loginPage;
const actualizarAdmin = () => {
};
exports.actualizarAdmin = actualizarAdmin;
//# sourceMappingURL=login.js.map