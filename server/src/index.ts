import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "./config";
import { connectDB } from "./db";
import donutsRoutes from "./routes/donuts.routes";
import favoritesRoutes from "./routes/favorites.routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors({ origin: config.clientOrigin }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/donuts", donutsRoutes);
app.use("/api/favorites", favoritesRoutes);

app.use(errorHandler);

console.log("🟡 Iniciando servidor… intentando conectar a Mongo:", process.env.MONGO_URI);

connectDB()
  .then(() => {
    app.listen(config.port, () => {
      console.log(`✅ MongoDB conectado`);
      console.log(`🚀 API en http://localhost:${config.port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error conectando a MongoDB:", err?.message || err);
    process.exit(1);
  });
