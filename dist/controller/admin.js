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
exports.actualizarAdmin = exports.crearAdmin = exports.obtenerAdmins = void 0;
const bcrypt_1 = require("../helpers/bcrypt");
const dbconnection_1 = __importDefault(require("../db/dbconnection"));
const entities_1 = require("../models/entities");
const obtenerAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.obtenerAdmins = obtenerAdmins;
const crearAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, apellido, usuario, password } = req.body;
    try {
        const passwordHash = yield (0, bcrypt_1.encrypt)(password);
        const administrador = entities_1.Admin.create({
            NOMBRE: nombre.toUpperCase(),
            APELLIDO: apellido.toUpperCase(),
            USUARIO: usuario,
            PASSWORD: passwordHash
        });
        yield administrador.save();
        res.status(200).json({
            msg: "Admin Creado",
            administrador
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al Crear Administrador'
        });
    }
});
exports.crearAdmin = crearAdmin;
const actualizarAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const adminDB = dbconnection_1.default.getRepository(entities_1.Admin);
    const { body } = req;
    const idString = req.params.id;
    const id = parseInt(idString);
    if (Number.isNaN(id)) {
        return res.json({
            msg: `Debe enviar un id Valido`
        });
    }
    try {
        const administrador = yield adminDB.findOneBy({
            ID: id
        });
        if (!administrador) {
            return res.status(404).json({ msg: "No se encontro producto con el id suministrado" });
        }
        const passwordHash = yield (0, bcrypt_1.encrypt)(body.PASSWORD);
        body.PASSWORD = passwordHash;
        adminDB.merge(administrador, body);
        yield adminDB.save(administrador);
        res.status(200).json({
            msg: "Admin Actualizado",
            administrador
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al actualizar datos del Administrador'
        });
    }
});
exports.actualizarAdmin = actualizarAdmin;
//# sourceMappingURL=admin.js.map