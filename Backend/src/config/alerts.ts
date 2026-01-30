export const ALERTS = {
  humidityWarn: Number(process.env.HUMIDITY_WARN ?? 80),
  humidityCritical: Number(process.env.HUMIDITY_CRITICAL ?? 90),

  tempInsideWarn: Number(process.env.TEMP_INSIDE_WARN ?? 30),
  tempInsideCritical: Number(process.env.TEMP_INSIDE_CRITICAL ?? 40),
};
