export interface SensorIngestDto {
  deviceId: string;
  timestamp: string;
  tempInside: number;
  tempOutside: number;
  humidityInside: number;
  lat: number;
  lon: number;
}
