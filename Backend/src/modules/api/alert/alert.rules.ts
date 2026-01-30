import type { SensorIngestDto } from "../sensor/sensor.types";
import { ALERTS } from "../../../config/alerts";
import type { AlertLevel, AlertResult } from "./alert.types";

export const evaluateAlert = (dto: SensorIngestDto): AlertResult => {
  const reasons: string[] = [];
  let level: AlertLevel = "ok";

  // humidity
  if (dto.humidityInside >= ALERTS.humidityCritical) {
    level = "critical";
    reasons.push(`humidityInside >= ${ALERTS.humidityCritical}`);
  } else if (dto.humidityInside >= ALERTS.humidityWarn) {
    level = "warning";
    reasons.push(`humidityInside >= ${ALERTS.humidityWarn}`);
  }

  // temp inside
  if (dto.tempInside >= ALERTS.tempInsideCritical) {
    level = "critical";
    reasons.push(`tempInside >= ${ALERTS.tempInsideCritical}`);
  } else if (dto.tempInside >= ALERTS.tempInsideWarn) {
    if (level !== "critical") level = "warning";
    reasons.push(`tempInside >= ${ALERTS.tempInsideWarn}`);
  }

  return { deviceId: dto.deviceId, level, reasons };
};
