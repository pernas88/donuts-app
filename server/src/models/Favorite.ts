import { Schema, model, Document, Types } from "mongoose";
  export interface IFavorite extends Document {
    donutId: Types.ObjectId; // referencia a Donut
}
  const FavoriteSchema = new Schema<IFavorite>({
    donutId: { type: Schema.Types.ObjectId, ref: "Donut", required: true,
  unique: true }
  }, { timestamps: true });
export const Favorite = model<IFavorite>("Favorite", FavoriteSchema);