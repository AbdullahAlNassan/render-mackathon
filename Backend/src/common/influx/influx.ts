import {
  InfluxDB,
  Point,
  type WriteApi,
  type QueryApi,
} from "@influxdata/influxdb-client";
import { env } from "../../config/env";
import type { SensorIngestDto } from "../../modules/api/sensor/sensor.types";

export const influxEnabled = Boolean(
  env.influxUrl && env.influxToken && env.influxOrg && env.influxBucket
);

let writeApi: WriteApi;
let queryApi: QueryApi;

if (influxEnabled) {
  const influx = new InfluxDB({
    url: env.influxUrl,
    token: env.influxToken,
  });

  // WRITE (POST)
  writeApi = influx.getWriteApi(env.influxOrg, env.influxBucket, "ns");

  // READ (GET)
  queryApi = influx.getQueryApi(env.influxOrg);
} else {
  const disabledError = new Error(
    "InfluxDB is not configured. Set INFLUX_URL, INFLUX_TOKEN, INFLUX_ORG, INFLUX_BUCKET."
  );

  writeApi = {
    writePoint() {
      throw disabledError;
    },
    async flush() {
      throw disabledError;
    },
  } as unknown as WriteApi;

  queryApi = {
    queryRows() {
      throw disabledError;
    },
  } as unknown as QueryApi;
}

export { writeApi, queryApi };

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
