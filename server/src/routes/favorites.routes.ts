import { Router } from "express";
import { getAllFavorites, isFavorite, addFavorite, removeFavorite } from "../controllers/favorites.controller";

const router = Router();

router.get("/", getAllFavorites);                 // GET    /api/favorites
router.get("/:donutId", isFavorite);              // GET    /api/favorites/:donutId
router.post("/", addFavorite);                    // POST   /api/favorites
router.delete("/:donutId", removeFavorite);       // DELETE /api/favorites/:donutId

export default router;
