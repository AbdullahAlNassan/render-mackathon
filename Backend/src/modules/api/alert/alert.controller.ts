import { Request, Response, NextFunction } from "express";
import { AlertService } from "./alert.service";

export const alertController = {
  async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const data = await AlertService.list();
      res.json({ data });
    } catch (e) {
      next(e);
    }
  },

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const deviceId = req.params.deviceId;
      const data = await AlertService.get(deviceId);
      if (!data) return res.status(404).json({ error: "Alert not found" });
      res.json({ data });
    } catch (e) {
      next(e);
    }
  },

  async history(req: Request, res: Response, next: NextFunction) {
    try {
      const deviceId = req.params.deviceId;
      const limit = Number(req.query.limit ?? 50);
      const data = await AlertService.history(deviceId, limit);
      res.json({ data });
    } catch (e) {
      next(e);
    }
  },
};
