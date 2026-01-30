import { Request, Response, NextFunction } from "express";
import { TestdataService } from "./testdata.service";

const allowed = new Set(["2s", "5s", "30s", "2m", "5m"]);

export const testdataController = {
  start(req: Request, res: Response, next: NextFunction) {
    try {
      const deviceIds = (req.body?.deviceIds ?? ["container-01"]) as string[];
      const interval = String(req.body?.interval ?? "30s");

      if (!Array.isArray(deviceIds) || deviceIds.length === 0) {
        return res
          .status(400)
          .json({ error: "deviceIds must be a non-empty array" });
      }
      if (!allowed.has(interval)) {
        return res
          .status(400)
          .json({ error: "interval must be one of: 2s, 5s, 30s, 2m, 5m" });
      }

      const state = TestdataService.start({
        deviceIds,
        interval: interval as any,
      });
      res.status(201).json({ ok: true, data: state });
    } catch (e) {
      next(e);
    }
  },

  stop(_req: Request, res: Response) {
    const state = TestdataService.stop();
    res.json({ ok: true, data: state });
  },

  status(_req: Request, res: Response) {
    res.json({ ok: true, data: TestdataService.status() });
  },
};
