import { Router } from "express";
import { controlPage, loginPage } from "../controller/pages";
import { validarJWT } from "../middlewares/validarjwt";

const router = Router();

router.get('/', loginPage)
router.get('/panelcontrol', controlPage)

export default router;