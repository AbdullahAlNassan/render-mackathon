export type AlertLevel = "ok" | "warning" | "critical";

export type AlertResult = {
  deviceId: string;
  level: AlertLevel;
  reasons: string[];
};
