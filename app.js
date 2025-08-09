import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import itemRoutes from "./routes/itemRoutes.js";
import itemsRoutes from "./routes/itemsRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import { apiKeyAuth } from "./middlewares/auth.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(apiKeyAuth);
app.use("/item", itemRoutes);
app.use("/items", itemsRoutes);
app.use("/category", categoryRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to Database");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }).catch((err) => console.error("DB connection error:", err));
