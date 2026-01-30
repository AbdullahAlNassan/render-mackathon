-- CreateTable
CREATE TABLE "device_alert" (
    "deviceId" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "reasons" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "device_alert_pkey" PRIMARY KEY ("deviceId")
);

-- AddForeignKey
ALTER TABLE "device_alert" ADD CONSTRAINT "device_alert_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;
