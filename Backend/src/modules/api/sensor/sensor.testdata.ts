import type { SensorIngestDto } from "./sensor.types";

export function makeSimulatedReading(
  deviceId: string,
  time: Date
): SensorIngestDto {
  // basis waarden (realistisch)
  const tempOutside = round(5 + rand(-3, 6)); // ~2..11
  const tempInside = round(20 + rand(-2, 4)); // ~18..24
  const humidityInside = round(clamp(65 + rand(-10, 15), 0, 100)); // ~55..80

  // voorbeeld GPS (Amsterdam-ish) - pas aan naar container locatie
  const lat = round(52.3702 + rand(-0.002, 0.002), 6);
  const lon = round(4.8952 + rand(-0.002, 0.002), 6);

  return {
    deviceId,
    timestamp: time.toISOString(),
    tempInside,
    tempOutside,
    humidityInside,
    lat,
    lon,
  };
}

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}
function round(v: number, decimals = 1) {
  const p = Math.pow(10, decimals);
  return Math.round(v * p) / p;
}
