import type { SensorIngestDto } from "../sensor/sensor.types";
import { evaluateAlert } from "./alert.rules";
import { AlertRepository } from "./alert.repository";

export const AlertService = {
  async evaluateAndSave(dto: SensorIngestDto) {
    const next = evaluateAlert(dto);

    // check vorige status
    const prev = await AlertRepository.findLatest(dto.deviceId);

    const changed = !prev || prev.level !== next.level;

    if (next.level === "ok") {
      // current alert weg + event loggen als je van warning/critical naar ok gaat
      await AlertRepository.delete(dto.deviceId).catch(() => {});
      if (prev && prev.level !== "ok") {
        await AlertRepository.createEvent(next);
      }
      return next;
    }

    // warning/critical: current upsert
    await AlertRepository.upsert(next);

    // history alleen als level verandert
    if (changed) {
      await AlertRepository.createEvent(next);
    }

    return next;
  },

  async list() {
    return AlertRepository.list();
  },

  async get(deviceId: string) {
    return AlertRepository.findByDeviceId(deviceId);
  },

  async history(deviceId: string, limit = 50) {
    return AlertRepository.listEvents(deviceId, limit);
  },
};
