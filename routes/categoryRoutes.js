import express from "express";
import { createCategory, getCategoryById } from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", createCategory);
router.get("/:id", getCategoryById);

export default router;
