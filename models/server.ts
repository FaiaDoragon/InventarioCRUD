import express, { Application } from "express";
import cors from "cors"
import db from "../db/dbconnection";
import productos from "../routes/productos";
import auth from "../routes/auth";
import pages from "../routes/pages";
import hbs from 'hbs';
import path from "path";
import fs from 'fs'

const bannerPartialContent = fs.readFileSync(path.join(__dirname, '../../views/partials/banner.hbs'), 'utf8');

class Server {
    private app : Application;
    private port: string;
    private hbs;
    private path = {
        pages: '/',
        auth: '/api/admin',
        productos: '/api/admin/productos'

    }

    constructor() {
        this.app = express()
        this.port = process.env.PORT || '3000';
        this.hbs = hbs

        this.middleware()

        this.db()

        this.routes()
    }

    middleware() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.static('public'))

    }

    async db() {
        try {
            await db.initialize()
            console.log("Conexion con la base de datos exitosa!")
        } catch (error) {
            console.error("Error durante la inicializacion de la base de datos", error)
        }
    }

    routes() {
        
        this.app.set('view engine', 'hbs');
        this.hbs.registerPartial('banner', bannerPartialContent);
        this.app.use(this.path.pages, pages)
        
        this.app.use(this.path.auth, auth)
        this.app.use(this.path.productos, productos)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
            
        })
    }
}

export default Server;