import { Request, Response } from 'express';
import path from 'path';
import { compare } from '../helpers/bcrypt';
import db from '../db/dbconnection';
import { Admin } from '../models/entities';


export const loginAuth = async(req: Request, res: Response) => {

    const { USUARIO, PASSWORD } = req.body

    const adminDB = db.getRepository(Admin)

    try {

        const administrador = await adminDB.findOneBy({
            USUARIO
        })

        if (!administrador) {
            return res.status(404).json({
                msg: `Usuario o Contraseña invalidos`
            })
        }

        const checkPassword = await compare(PASSWORD, administrador.PASSWORD)

        if (!checkPassword) {
            res.status(409).json({
                msg : `Usuario o Contraseña invalidos`
            })
        }

        res.status(200).json({
        administrador
        })
    } catch (error) {
        
    }

    
    //res.status(200).sendFile(path.join(__dirname, '../../', 'public', 'controlpanel.html'))

}

export const loginPage = () => {

}


