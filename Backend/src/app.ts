import express from "express";
import cors from "cors";

import { router } from "./routes";
import { errorHandler } from "./common/middleware/errorHandler";
import authRoutes from "./modules/domain/auth/auth.routes";
import sensorRoutes from "./modules/api/sensor/sensor.routes";
import deviceRoutes from "./modules/api/devices/device.routes";
import testdataRoutes from "./modules/api/testdata/testdata.routes";
import alertRoutes from "./modules/api/alert/alert.routes";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/sensor", sensorRoutes);
app.use("/api/v1/devices", deviceRoutes);
app.use("/api/v1/testdata", testdataRoutes);
app.use("/api/v1/alerts", alertRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// alle modules komen hieronder
app.use("/api", router);

// error handler altijd als laatste
app.use(errorHandler);

export default app;
