import { Request, Response } from "express";
import { home } from "../helpers/handlebars";

export const loginPage = (req: Request, res : Response) => {
    res.render('home');
}

export const controlPage = (req: Request, res : Response) => {
    res.render('controlpanel', home);
}
