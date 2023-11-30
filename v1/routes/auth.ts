import { Router } from "express";
import { loginAuth, /*renovarToken*/ } from "../../controller/auth";
import { /*crearAdmin,*/ actualizarAdmin } from "../../controller/admin";
import { validarJWT } from "../../middlewares/validarjwt";



const router = Router();

router.post('/login', loginAuth );
//router.get('/validator', validarJWT, renovarToken );
//router.post('/register', crearAdmin );
router.put('/update/:id', validarJWT ,actualizarAdmin);

export default router;