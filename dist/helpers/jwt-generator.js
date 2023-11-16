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
exports.comprobarJWT = exports.generarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const entities_1 = require("../models/entities");
const dbconnection_1 = __importDefault(require("../db/dbconnection"));
const generarJWT = (administrador) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign({
            id: administrador.ID,
            edad: administrador.EDAD,
            role: "admin"
        }, process.env.KEY_TOKEN || "", {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.generarJWT = generarJWT;
const comprobarJWT = (token = '') => __awaiter(void 0, void 0, void 0, function* () {
    const adminDB = dbconnection_1.default.getRepository(entities_1.Admin);
    try {
        if (token.length < 10) {
            return null;
        }
        const payload = jsonwebtoken_1.default.verify(token, process.env.KEY_TOKEN || '');
        const usuario = yield adminDB.findOneBy(payload.id);
        if (!usuario) {
            return null;
        }
        if (!usuario.ESTADO) {
            return null;
        }
        return usuario;
    }
    catch (error) {
        return null;
    }
});
exports.comprobarJWT = comprobarJWT;
//# sourceMappingURL=jwt-generator.js.map