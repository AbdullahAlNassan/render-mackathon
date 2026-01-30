import { SensorService } from "../sensor/sensor.service";
import { makeSimulatedReading } from "../sensor/sensor.testdata";

type IntervalKey = "2s" | "5s" | "30s" | "2m" | "5m";

const INTERVALS: Record<IntervalKey, number> = {
  "2s": 2_000,
  "5s": 5_000,
  "30s": 30_000,
  "2m": 120_000,
  "5m": 300_000,
};

let timer: NodeJS.Timeout | null = null;
let state: {
  running: boolean;
  interval: IntervalKey;
  deviceIds: string[];
  startedAt?: string;
} = {
  running: false,
  interval: "30s",
  deviceIds: [],
};

export const TestdataService = {
  start(opts: { deviceIds: string[]; interval: IntervalKey }) {
    if (timer) clearInterval(timer);

    state = {
      running: true,
      interval: opts.interval,
      deviceIds: opts.deviceIds,
      startedAt: new Date().toISOString(),
    };

    const ms = INTERVALS[opts.interval];

    timer = setInterval(async () => {
      const now = new Date();
      for (const deviceId of opts.deviceIds) {
        const dto = makeSimulatedReading(deviceId, now);
        // gebruikt echte ingest flow
        await SensorService.ingest(dto);
      }
    }, ms);

    return state;
  },

  stop() {
    if (timer) clearInterval(timer);
    timer = null;
    state.running = false;
    return state;
  },

  status() {
    return state;
  },
};
