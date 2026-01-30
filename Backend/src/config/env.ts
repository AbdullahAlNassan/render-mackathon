import dotenv from "dotenv";
dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",

  jwtSecret: process.env.JWT_SECRET ?? "defaultSecret123",
  databaseUrl: process.env.DATABASE_URL || "",

  influxUrl: process.env.INFLUX_URL || "",
  influxToken: process.env.INFLUX_TOKEN || "",
  influxOrg: process.env.INFLUX_ORG || "",
  influxBucket: process.env.INFLUX_BUCKET || "",

  // Dev-only convenience: allow creating users via API (e.g. from Postman)
  allowRegister:
    process.env.ALLOW_REGISTER === "true" ||
    (process.env.NODE_ENV || "development") !== "production",
};
