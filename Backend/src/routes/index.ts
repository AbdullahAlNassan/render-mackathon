import { Router } from "express";
import { prisma } from "../config/prisma";

const router = Router();

router.get("/hello", (_req, res) => {
  res.json({ message: "Hello from API 👋" });
});

router.get("/db/health", async (_req, res, next) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ db: "ok" });
  } catch (err) {
    next(err);
  }
});

export { router };
