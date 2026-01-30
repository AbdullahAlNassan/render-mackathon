import { Router } from "express";
import { deviceController } from "./device.controller";

const deviceRoutes = Router();

deviceRoutes.get("/", deviceController.list);
deviceRoutes.get("/:id/status", deviceController.status);

export default deviceRoutes;
