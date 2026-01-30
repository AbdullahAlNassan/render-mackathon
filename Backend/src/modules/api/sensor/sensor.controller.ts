import { Request, Response, NextFunction } from "express";
import { SensorIngestSchema } from "./sensor.validation";
import { SensorService } from "./sensor.service";

export const sensorController = {
  async ingest(req: Request, res: Response, next: NextFunction) {
    try {
      const parsed = SensorIngestSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          message: "Validation failed",
          errors: parsed.error.flatten(),
        });
      }

      await SensorService.ingest(parsed.data);
      return res.status(202).json({ ok: true });
    } catch (error) {
      next(error);
    }
  },

  async series(req: any, res: any, next: any) {
    try {
      const deviceId = String(req.query.deviceId || "");
      const range = String(req.query.range || "1h");

      if (!deviceId)
        return res.status(400).json({ error: "deviceId is required" });
      if (!["1h", "24h", "7d"].includes(range)) {
        return res.status(400).json({ error: "range must be 1h, 24h, or 7d" });
      }

      const data = await SensorService.getSeries({
        deviceId,
        range: range as any,
      });
      res.json({ data });
    } catch (e) {
      next(e);
    }
  },
};
