import { Router } from "express";
import { testdataController } from "./testdata.controller";

const r = Router();

r.post("/start", testdataController.start);
r.post("/stop", testdataController.stop);
r.get("/status", testdataController.status);

export default r;
