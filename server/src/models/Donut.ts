import { Schema, model, Document } from "mongoose";

export interface IDonut extends Document {
  nombre: string;
  tipo: "Clásico" | "Berlina" | "Cruffin" | "Mini";
  precio: number;
  cobertura?: string | null;
  relleno?: string | null;
  toppings?: string[];
}

const DonutSchema = new Schema<IDonut>({
  nombre: { type: String, required: true, trim: true },
  tipo: { type: String, required: true, enum: ["Clásico", "Berlina", "Cruffin", "Mini"] },
  precio: { type: Number, required: true, min: 0 },
  cobertura: { type: String, default: null },
  relleno: { type: String, default: null },
  toppings: { type: [String], default: [] }
}, { timestamps: true });

export const Donut = model<IDonut>("Donut", DonutSchema);
