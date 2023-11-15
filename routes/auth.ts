import { Router } from "express";
import { loginAuth } from "../controller/auth";
import { /*crearAdmin,*/ actualizarAdmin } from "../controller/admin";



const router = Router();

router.post('/login', loginAuth );
//router.post('/register', crearAdmin );
router.put('/update/:id', actualizarAdmin);

export default router;