import { Request, Response, NextFunction } from "express";
import { SensorService } from "./sensor.service";
import { makeSimulatedReading } from "./sensor.testdata";

export const sensorTestController = {
  async simulate(req: Request, res: Response, next: NextFunction) {
    try {
      const deviceId = String(req.query.deviceId || "container-01");
      const count = Math.min(Number(req.query.count || 10), 500);

      const now = Date.now();
      for (let i = 0; i < count; i++) {
        const dto = makeSimulatedReading(
          deviceId,
          new Date(now - (count - i) * 30_000)
        );
        await SensorService.ingest(dto);
      }

      return res.status(201).json({ ok: true, deviceId, count });
    } catch (e) {
      next(e);
    }
  },
};
