
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Admin } from "../models/entities";
import db from "../db/dbconnection";

export const generarJWT = (administrador: any) => {

    return new Promise((resolve, reject) => {

        jwt.sign({
            id: administrador.ID,
            edad: administrador.EDAD,
            role: "admin"
        },
            process.env.KEY_TOKEN || "",
            {
                expiresIn: '4h'
            }, (err, token) => {
                if (err) {
                    console.log(err);
                    reject('No se pudo generar el token')
                } else {
                    resolve(token);
                }
            })
    })
}

export const comprobarJWT = async (token = '') => {

    const adminDB = db.getRepository(Admin)

    try {
        if (token.length < 10) {
            return null;
        }

        const payload: any = jwt.verify(token, process.env.KEY_TOKEN || '');
        const usuario = await adminDB.findOneBy(payload.id);

        if (!usuario) {
            return null;
        }
        if (!usuario.ESTADO) {
            return null
        }
        return usuario
    } catch (error) {
        return null;
    }
} 
