import expres from "express";
import { login, register } from "../controller/auth.controller.ts";

const router = expres.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
