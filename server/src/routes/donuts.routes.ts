import { Router } from "express";
import { createDonut, getDonuts, getDonutById, updateDonut, deleteDonut } from "../controllers/donuts.controller";

const router = Router();

router.post("/", createDonut);            // POST /api/donuts
router.get("/", getDonuts);               // GET  /api/donuts
router.get("/:id", getDonutById);         // GET  /api/donuts/:id
router.put("/:id", updateDonut);          // PUT  /api/donuts/:id
router.delete("/:id", deleteDonut);       // DELETE /api/donuts/:id

export default router;
