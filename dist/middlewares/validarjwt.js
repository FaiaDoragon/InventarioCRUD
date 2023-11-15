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
exports.validarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const entities_1 = require("../models/entities");
const dbconnection_1 = __importDefault(require("../db/dbconnection"));
const validarJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la peticion"
        });
    }
    try {
        const payload = jsonwebtoken_1.default.verify(token || '', process.env.KEY_TOKEN || "");
        const adminDB = dbconnection_1.default.getRepository(entities_1.Admin);
        const administrador = yield adminDB.findOneBy({
            ID: payload.id
        });
        if (!administrador) {
            return res.status(401).json({
                msg: 'token no valido - usuario con estado false'
            });
        }
        payload.id = administrador.ID;
        next();
    }
    catch (error) {
        res.status(401).json({
            msg: 'Token no valido'
        });
    }
});
exports.validarJWT = validarJWT;
//# sourceMappingURL=validarjwt.js.map