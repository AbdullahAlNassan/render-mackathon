import { Router } from "express";
import { sensorController } from "./sensor.controller";
import { sensorTestController } from "./sensor.test.controller";

const sensorRoutes = Router();

sensorRoutes.post("/", sensorController.ingest);

// testdata generator
sensorRoutes.post("/simulate", sensorTestController.simulate);

// GET series (voor grafieken)
sensorRoutes.get("/series", sensorController.series);

export default sensorRoutes;
