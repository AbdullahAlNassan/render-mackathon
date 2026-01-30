import { Router } from "express";
import { alertController } from "./alert.controller";
const alertRoutes = Router();

alertRoutes.get("/", alertController.list);
alertRoutes.get("/:deviceId", alertController.get);
alertRoutes.get("/:deviceId/history", alertController.history);

export default alertRoutes;
