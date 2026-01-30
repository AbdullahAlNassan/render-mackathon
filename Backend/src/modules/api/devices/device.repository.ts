import { prisma } from "../../../config/prisma";

export const DeviceRepository = {
  async listWithAlert() {
    return prisma.device.findMany({
      orderBy: { lastSeen: "desc" },
      select: {
        id: true,
        lastSeen: true,
        alert: {
          select: { level: true, reasons: true, updatedAt: true },
        },
      },
    });
  },

  async findById(id: string) {
    return prisma.device.findUnique({
      where: { id },
      select: {
        id: true,
        lastSeen: true,
        alert: { select: { level: true, reasons: true, updatedAt: true } },
      },
    });
  },
};
