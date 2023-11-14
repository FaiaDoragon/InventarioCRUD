"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const entities_1 = require("../models/entities");
const db = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123123",
    database: "Proyecto-Tienda",
    entities: [entities_1.Producto, entities_1.Admin],
    synchronize: true
});
exports.default = db;
//# sourceMappingURL=dbconnection.js.map