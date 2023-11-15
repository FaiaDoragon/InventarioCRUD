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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dbconnection_1 = __importDefault(require("../db/dbconnection"));
const productos_1 = __importDefault(require("../routes/productos"));
const auth_1 = __importDefault(require("../routes/auth"));
class Server {
    constructor() {
        this.path = {
            pages: '/',
            auth: '/api/admin',
            admin: '/api/admin/productos'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3000';
        this.middleware();
        this.db();
        this.routes();
    }
    middleware() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.static('public'));
    }
    db() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield dbconnection_1.default.initialize();
                console.log("Conexion con la base de datos exitosa!");
            }
            catch (error) {
                console.error("Error durante la inicializacion de la base de datos", error);
            }
        });
    }
    routes() {
        this.app.use(this.path.auth, auth_1.default);
        this.app.use(this.path.admin, productos_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map