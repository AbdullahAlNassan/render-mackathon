import {
  influxEnabled,
  writeApi,
  makeSensorPoint,
  queryApi,
} from "../../../common/influx/influx";
import type { SensorIngestDto } from "./sensor.types";
import { env } from "../../../config/env";

const RANGE: Record<"1h" | "24h" | "7d", string> = {
  "1h": "-1h",
  "24h": "-24h",
  "7d": "-7d",
};

export const SensorRepository = {
  async writeReading(dto: SensorIngestDto) {
    if (!influxEnabled) {
      return true;
    }
    writeApi.writePoint(makeSensorPoint(dto));
    await writeApi.flush();
    return true;
  },

  async getSeries(opts: { deviceId: string; range: "1h" | "24h" | "7d" }) {
    if (!influxEnabled) {
      return [];
    }
    const flux = `
from(bucket: "${env.influxBucket}")
  |> range(start: ${RANGE[opts.range]})
  |> filter(fn: (r) => r._measurement == "sensor_reading")
  |> filter(fn: (r) => r.deviceId == "${opts.deviceId}")
  |> filter(fn: (r) => r._field == "tempInside" or r._field == "tempOutside" or r._field == "humidityInside")
  |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
  |> keep(columns: ["_time", "tempInside", "tempOutside", "humidityInside"])
  |> sort(columns: ["_time"])
`;

    const rows: any[] = [];

    await new Promise<void>((resolve, reject) => {
      queryApi.queryRows(flux, {
        next(row, tableMeta) {
          const o = tableMeta.toObject(row) as any;
          rows.push({
            time: o._time,
            tempInside: o.tempInside ?? null,
            tempOutside: o.tempOutside ?? null,
            humidityInside: o.humidityInside ?? null,
          });
        },
        error(err) {
          reject(err);
        },
        complete() {
          resolve();
        },
      });
    });

    return rows;
  },
};
