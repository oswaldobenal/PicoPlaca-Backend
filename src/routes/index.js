import { Router } from "express";
import {
  createRestriction,
  deleteRestriction,
  editRestrictions,
  getAllRestrictions,
  getDetail,
  verifyPlaca,
} from "../controllers/restriction.controller.js";

const router = Router();

router.post("/horapico", createRestriction);
router.get("/horapico", getAllRestrictions);
router.patch("/horapico/:id", editRestrictions);
router.post("/verify", verifyPlaca);
router.get("/detail/:id", getDetail);
router.delete("/restriction/:id", deleteRestriction);

export default router;
