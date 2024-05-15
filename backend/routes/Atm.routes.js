import { Router } from "express";

import { AtmController } from "../controller/Atm.controller.js";


const router = Router();

router.route("/withdraw").post(AtmController);

export default router;
