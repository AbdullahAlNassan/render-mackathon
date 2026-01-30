import { DeviceRepository } from "./device.repository";

const ONLINE_MINUTES = 5;

export const DeviceService = {
  async listDevices() {
    const devices: Array<{
      id: string;
      lastSeen: Date;
      alert: null | { level: string; reasons: unknown; updatedAt: Date };
    }> = await DeviceRepository.listWithAlert();

    return devices.map((d) => {
      const lastSeen = new Date(d.lastSeen);
      const online = Date.now() - lastSeen.getTime() <= ONLINE_MINUTES * 60_000;

      return {
        deviceId: d.id,
        lastSeen: lastSeen.toISOString(),
        online,
        alert: d.alert
          ? {
              level: d.alert.level,
              reasons: d.alert.reasons,
              updatedAt: d.alert.updatedAt,
            }
          : { level: "ok", reasons: [], updatedAt: null },
      };
    });
  },

  async getStatus(deviceId: string) {
    const device = await DeviceRepository.findById(deviceId);
    if (!device) return { deviceId, online: false, lastSeen: null };

    const lastSeen = new Date(device.lastSeen);
    const online = Date.now() - lastSeen.getTime() <= ONLINE_MINUTES * 60_000;

    return { deviceId, online, lastSeen: lastSeen.toISOString() };
  },
};
