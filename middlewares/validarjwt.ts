import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/entities';
import db from '../db/dbconnection';
import express from 'express';


export const validarJWT = async (req: Request, res: Response, next: express.NextFunction) => {

    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            msg: "No hay token en la peticion"
        })
    }

    try {
        const payload = jwt.verify(token || '', process.env.KEY_TOKEN || "")

        const adminDB = db.getRepository(Admin)

        const administrador = await adminDB.findOneBy({
            ID: payload.id
        })

        if (!administrador) {
            return res.status(401).json({
                msg: 'token no valido - usuario con estado false'
            })
        }

        payload.id = administrador.ID

        next()
    } catch (error) {
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}