import { InfluxDB, Point } from "@influxdata/influxdb-client";
import { env } from "../../config/env";
import type { SensorIngestDto } from "../../modules/api/sensor/sensor.types";

const influx = new InfluxDB({
  url: env.influxUrl,
  token: env.influxToken,
});

// WRITE (POST)
export const writeApi = influx.getWriteApi(
  env.influxOrg,
  env.influxBucket,
  "ns"
);

// READ (GET)  ← DEZE ONTBRAK
export const queryApi = influx.getQueryApi(env.influxOrg);

// helper om points te maken
export const makeSensorPoint = (dto: SensorIngestDto) => {
  return new Point("sensor_reading")
    .tag("deviceId", dto.deviceId)
    .floatField("tempInside", dto.tempInside)
    .floatField("tempOutside", dto.tempOutside)
    .floatField("humidityInside", dto.humidityInside)
    .floatField("lat", dto.lat)
    .floatField("lon", dto.lon)
    .timestamp(new Date(dto.timestamp));
};
