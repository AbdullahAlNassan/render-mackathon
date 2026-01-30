import { Request, Response, NextFunction } from "express";
import { DeviceService } from "./device.service";

export const deviceController = {
  async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const devices = await DeviceService.listDevices();
      res.json({ data: devices });
    } catch (e) {
      next(e);
    }
  },

  async status(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const result = await DeviceService.getStatus(id);
      if (!result) return res.status(404).json({ error: "Device not found" });
      res.json({ data: result });
    } catch (e) {
      next(e);
    }
  },
};
