"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginPage = exports.loginAuth = void 0;
const bcrypt_1 = require("../helpers/bcrypt");
const dbconnection_1 = __importDefault(require("../db/dbconnection"));
const entities_1 = require("../models/entities");
const loginAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { USUARIO, PASSWORD } = req.body;
    const adminDB = dbconnection_1.default.getRepository(entities_1.Admin);
    try {
        const administrador = yield adminDB.findOneBy({
            USUARIO
        });
        if (!administrador) {
            return res.status(404).json({
                msg: `Usuario o Contraseña invalidos`
            });
        }
        const checkPassword = yield (0, bcrypt_1.compare)(PASSWORD, administrador.PASSWORD);
        if (!checkPassword) {
            res.status(409).json({
                msg: `Usuario o Contraseña invalidos`
            });
        }
        res.status(200).json({
            administrador
        });
    }
    catch (error) {
    }
    //res.status(200).sendFile(path.join(__dirname, '../../', 'public', 'controlpanel.html'))
});
exports.loginAuth = loginAuth;
const loginPage = () => {
};
exports.loginPage = loginPage;
//# sourceMappingURL=auth.js.map