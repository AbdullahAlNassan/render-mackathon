-- CreateTable
CREATE TABLE "device_alert_event" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "reasons" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "device_alert_event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "device_alert_event_deviceId_createdAt_idx" ON "device_alert_event"("deviceId", "createdAt");

-- AddForeignKey
ALTER TABLE "device_alert_event" ADD CONSTRAINT "device_alert_event_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;
