import express from "express";
import { getItemById, searchItem } from "../controllers/itemController.js";

const router = express.Router();

router.get("/search", searchItem);
router.get("/:id", getItemById);

export default router;