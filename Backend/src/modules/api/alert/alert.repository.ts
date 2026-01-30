import { prisma } from "../../../config/prisma";
import type { AlertResult } from "./alert.types";

export const AlertRepository = {
  upsert(alert: AlertResult) {
    return prisma.deviceAlert.upsert({
      where: { deviceId: alert.deviceId },
      update: { level: alert.level, reasons: alert.reasons },
      create: {
        deviceId: alert.deviceId,
        level: alert.level,
        reasons: alert.reasons,
      },
    });
  },

  delete(deviceId: string) {
    return prisma.deviceAlert.delete({
      where: { deviceId },
    });
  },

  list() {
    return prisma.deviceAlert.findMany({
      orderBy: { updatedAt: "desc" },
    });
  },

  findByDeviceId(deviceId: string) {
    return prisma.deviceAlert.findUnique({
      where: { deviceId },
    });
  },

  createEvent(alert: AlertResult) {
    return prisma.deviceAlertEvent.create({
      data: {
        deviceId: alert.deviceId,
        level: alert.level,
        reasons: alert.reasons,
      },
    });
  },

  findLatest(deviceId: string) {
    return prisma.deviceAlert.findUnique({
      where: { deviceId },
      select: { deviceId: true, level: true },
    });
  },

  listEvents(deviceId: string, limit = 50) {
    return prisma.deviceAlertEvent.findMany({
      where: { deviceId },
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        deviceId: true,
        level: true,
        reasons: true,
        createdAt: true,
      },
    });
  },
};
