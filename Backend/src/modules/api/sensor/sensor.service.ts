import type { SensorIngestDto } from "./sensor.types";
import { SensorRepository } from "./sensor.repository";
import { prisma } from "../../../config/prisma";
import { AlertService } from "../alert/alert.service";

export const SensorService = {
  async ingest(dto: SensorIngestDto) {
    // 1) schrijf naar Influx
    await SensorRepository.writeReading(dto);

    // timestamp safe (als jij handmatig post met oude/invalid timestamp)
    const ts = dto.timestamp ? new Date(dto.timestamp) : new Date();
    const safeTs = isNaN(ts.getTime()) ? new Date() : ts;

    // 2) update device status (Postgres)
    await prisma.device.upsert({
      where: { id: dto.deviceId },
      update: { lastSeen: safeTs },
      create: { id: dto.deviceId, lastSeen: safeTs },
    });

    // 3) alert evalueren + opslaan
    await AlertService.evaluateAndSave(dto);

    return true;
  },

  async getSeries(opts: { deviceId: string; range: "1h" | "24h" | "7d" }) {
    return SensorRepository.getSeries(opts);
  },
};
