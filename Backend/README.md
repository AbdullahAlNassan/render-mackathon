# Project Mackathon – Backend

Dit project is een backend systeem voor het monitoren van containers via sensoren.
De backend ontvangt sensordata (temperatuur, vochtigheid, locatie), verwerkt deze
en bepaalt automatisch de status van containers en eventuele waarschuwingen.

Het systeem is gebouwd om te werken met echte hardware (Raspberry Pi + sensoren),
maar ondersteunt ook testdata zodat ontwikkeling mogelijk is zonder hardware.

---

## Architectuur

- **Express.js** – REST API
- **PostgreSQL (TimescaleDB)** – relationele data (users, devices, alerts)
- **InfluxDB** – time-series sensordata
- **Prisma** – ORM
- **Docker / Docker Compose** – development & deployment
- **Zod** – request validatie

---

## Belangrijkste features

- Authentificatie (JWT)
- Sensor data ingest endpoint
- Device online/offline status
- Time-series data (voor grafieken)
- Alert logic (warning / critical)
- Alert history per device
- Testdata generator
- Dockerized setup

---

## Device logica

Een device (container) wordt automatisch:

- **online** als `lastSeen < 5 minuten`
- **offline** als geen recente data binnenkomt

---

## Alert logica

Alerts worden automatisch bepaald op basis van thresholds:

- humidityInside
- tempInside

Status:

- `ok`
- `warning`
- `critical`

Elke statuswijziging wordt opgeslagen als **alert history**.

---

## Runnen van het project

```bash
docker compose up -d
```
