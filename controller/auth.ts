import { Request, Response } from 'express';
import path from 'path';
import { encrypt } from '../helpers/bcrypt';
import db from '../db/dbconnection';
import { Admin } from '../models/entities';


export const loginAuth = (req: Request, res: Response) => {

    res.status(200).sendFile(path.join(__dirname, '../../', 'public', 'controlpanel.html'))

}

export const loginPage = () => {

}


