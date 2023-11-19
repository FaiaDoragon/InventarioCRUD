import { Router } from "express";
import { controlPage, loginPage } from "../../controller/pages";

const router = Router();

router.get('/', loginPage)
router.get('/panelcontrol', controlPage)

export default router;