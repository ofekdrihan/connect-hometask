import express from "express"
import { createOrUpdateItem, getAllItems } from "../controllers/itemController.js";

const router = express.Router();

router.post("/", createOrUpdateItem);
router.get("/", getAllItems);

export default router;