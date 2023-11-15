import { Request, Response } from 'express';
import { encrypt } from '../helpers/bcrypt';
import db from '../db/dbconnection';
import { Admin } from '../models/entities';

export const obtenerAdmins = async(req: Request, res: Response) => {
    
}

export const crearAdmin = async(req: Request, res: Response) => {

    const {
        nombre,
        apellido,
        usuario,
        password
    } = req.body;

    const adminDB = db.getRepository(Admin)

    try {

        const existeAdministrador = await adminDB.findOneBy({
            USUARIO: usuario
        })

        if (existeAdministrador) {
            return res.status(409).json({
                msg : `Ya existe un usuario denominado: ${usuario}` 
            })
        }
        
        const passwordHash = await encrypt(password)

        const administrador = Admin.create({
            NOMBRE : nombre.toUpperCase(),
            APELLIDO : apellido.toUpperCase(),
            USUARIO: usuario,
            PASSWORD : passwordHash
        });

        await administrador.save()

        res.status(200).json({
            msg: "Admin Creado",
            administrador
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al Crear Administrador'
        });
    }
}

export const actualizarAdmin = async (req: Request, res: Response) => {

    const adminDB = db.getRepository(Admin)
    const { body } = req
    const idString = req.params.id

    const id = parseInt(idString)

    if (Number.isNaN(id)) {
        return res.json({
            msg: `Debe enviar un id Valido`
        })
    }

    try {


        const administrador = await adminDB.findOneBy({
            ID: id
        })

        if (!administrador) {
            return res.status(404).json({ msg: "No se encontro producto con el id suministrado" })
        }

        const passwordHash = await encrypt(body.PASSWORD);

        body.PASSWORD = passwordHash

        adminDB.merge(administrador, body)

        await adminDB.save(administrador);

        res.status(200).json({
            msg: "Admin Actualizado",
            administrador
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al actualizar datos del Administrador'
        });
    }
}