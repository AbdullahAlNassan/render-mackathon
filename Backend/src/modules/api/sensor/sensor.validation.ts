import { z } from "zod";

export const SensorIngestSchema = z
  .object({
    deviceId: z.string().min(1, "deviceId is required"),
    timestamp: z.string().datetime("timestamp must be ISO datetime"),

    tempInside: z.number(),
    tempOutside: z.number(),
    humidityInside: z.number().min(0).max(100),

    lat: z.number().min(-90).max(90),
    lon: z.number().min(-180).max(180),
  })
  .strict();
