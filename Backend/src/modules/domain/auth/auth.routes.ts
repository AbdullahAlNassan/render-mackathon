import { Router } from "express";
import { authcontroller } from "./auth.controller";
import { authenticate } from "../../../common/middleware/authenticate ";
const authRoutes = Router();

authRoutes.post("/register", authcontroller.register);
authRoutes.post("/login", authcontroller.login);
authRoutes.get("/me", authenticate, authcontroller.me);
authRoutes.post("/logout", authenticate, authcontroller.logout);

export default authRoutes;
