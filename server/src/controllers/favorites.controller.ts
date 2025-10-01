import { Request, Response, NextFunction } from "express";
import { Favorite } from "../models/Favorite";

export async function getAllFavorites(_req: Request, res: Response, next: NextFunction) {
  try {
    const favs = await Favorite.find({}).populate("donutId");
    res.json(favs);
  } catch (err) { next(err); }
}

export async function isFavorite(req: Request, res: Response, next: NextFunction) {
  try {
    const fav = await Favorite.findOne({ donutId: req.params.donutId });
    res.json({ favorite: !!fav });
  } catch (err) { next(err); }
}

export async function addFavorite(req: Request, res: Response, next: NextFunction) {
  try {
    const { donutId } = req.body;
    const fav = await Favorite.create({ donutId });
    res.status(201).json(fav);
  } catch (err) { next(err); }
}

export async function removeFavorite(req: Request, res: Response, next: NextFunction) {
  try {
    await Favorite.findOneAndDelete({ donutId: req.params.donutId });
    res.json({ message: "Favorito eliminado" });
  } catch (err) { next(err); }
}
