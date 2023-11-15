import { Request, Response } from 'express';
import { compare } from '../helpers/bcrypt';
import db from '../db/dbconnection';
import { Admin } from '../models/entities';
import { generarJWT } from '../helpers/jwt-generator';


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

        const tokenSesion = await generarJWT(administrador)

        res.status(200).json({
        administrador,
        tokenSesion
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg : 'hubo un error comuniquese con el administrador'
        })
    }

    
    //res.status(200).sendFile(path.join(__dirname, '../../', 'public', 'controlpanel.html'))

}

export const loginPage = () => {

}


