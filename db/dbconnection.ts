import { DataSource } from "typeorm"
import { Producto, Admin } from '../models/entities';

const db = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123123",
    database: "Proyecto-Tienda",
    entities: [Producto, Admin],
    synchronize: true
})

export default db;