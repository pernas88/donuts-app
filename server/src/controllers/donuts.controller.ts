import { Request, Response, NextFunction } from "express";
import { Donut } from "../models/Donut";

const BASE_PRICES: Record<string, number> = {
  "Clásico": 1.2,
  "Berlina": 1.5,
  "Cruffin": 1.8,
  "Mini": 0.9
};

const COVER_SUPPLEMENTS: Record<string, number> = {
  "Chocolate": 0.2, "Vainilla": 0.0, "Fresa": 0.2, "Azúcar": 0.0,
  "Pistacho": 0.4, "Caramelo salado": 0.2, "Canela": 0.0,
  "Glaseado clásico": 0.0, "Cookies & Cream": 0.4, "Matcha": 0.4
};

const FILL_SUPPLEMENTS: Record<string, number> = {
  "Chocolate": 0.2, "Fresa": 0.2, "Pistacho": 0.4, "Crema pastelera": 0.2,
  "Dulce de leche": 0.2, "Avellana (tipo gianduja)": 0.4, "Vainilla": 0.0, "Lemon curd": 0.2
};

const TOPPINGS: Record<string, number> = {
  "Crocanti de cacahuete": 0.1, "Almendra laminada": 0.2, "Virutas de chocolate": 0.1,
  "Nibs de cacao": 0.2, "Sprinkles de colores": 0.1, "Galleta Lotus": 0.3,
  "Frutos rojos liofilizados": 0.3
};

const round2 = (n: number) => Math.round(n * 100) / 100;

function computePrice(params: { tipo: string; cobertura?: string | null; relleno?: string | null; toppings?: string[] }) {
  const base = BASE_PRICES[params.tipo] ?? 0;
  const addMain = params.tipo === "Berlina"
    ? (params.relleno ? (FILL_SUPPLEMENTS[params.relleno] ?? 0) : 0)
    : (params.cobertura ? (COVER_SUPPLEMENTS[params.cobertura] ?? 0) : 0);
  const addToppings = (params.toppings || []).reduce((s, t) => s + (TOPPINGS[t] ?? 0), 0);
  return round2(base + addMain + addToppings);
}

export async function createDonut(req: Request, res: Response, next: NextFunction) {
  try {
    const { nombre, tipo, cobertura = null, relleno = null, toppings = [] } = req.body || {};
    if (!nombre || !tipo) return res.status(400).json({ message: "Datos inválidos: nombre y tipo son obligatorios" });
    if (!["Clásico", "Berlina", "Cruffin", "Mini"].includes(tipo)) return res.status(400).json({ message: "Tipo inválido" });
    if (tipo === "Berlina" && !relleno) return res.status(400).json({ message: "Berlina requiere un relleno" });
    if (tipo !== "Berlina" && !cobertura) return res.status(400).json({ message: "Este tipo requiere una cobertura" });

    const precio = computePrice({ tipo, cobertura, relleno, toppings });
    const donut = await Donut.create({ nombre: String(nombre).trim(), tipo, precio, cobertura, relleno, toppings });
    res.status(201).json(donut);
  } catch (err) { next(err); }
}

export async function getDonuts(_req: Request, res: Response, next: NextFunction) {
  try {
    const donuts = await Donut.find({}, { nombre: 1, tipo: 1, precio: 1, cobertura: 1, relleno: 1, toppings: 1 });
    res.json(donuts);
  } catch (err) { next(err); }
}

export async function getDonutById(req: Request, res: Response, next: NextFunction) {
  try {
    const donut = await Donut.findById(req.params.id);
    if (!donut) return res.status(404).json({ message: "Donut no encontrado" });
    res.json(donut);
  } catch (err) { next(err); }
}

export async function updateDonut(req: Request, res: Response, next: NextFunction) {
  try {
    const current = await Donut.findById(req.params.id);
    if (!current) return res.status(404).json({ message: "Donut no encontrado" });

    const payload = {
      nombre: req.body?.nombre ?? current.nombre,
      tipo: req.body?.tipo ?? current.tipo,
      cobertura: req.body?.cobertura ?? current.cobertura,
      relleno: req.body?.relleno ?? current.relleno,
      toppings: req.body?.toppings ?? current.toppings
    } as { nombre: string; tipo: string; cobertura?: string | null; relleno?: string | null; toppings?: string[] };

    if (!["Clásico", "Berlina", "Cruffin", "Mini"].includes(payload.tipo)) return res.status(400).json({ message: "Tipo inválido" });
    if (payload.tipo === "Berlina" && !payload.relleno) return res.status(400).json({ message: "Berlina requiere un relleno" });
    if (payload.tipo !== "Berlina" && !payload.cobertura) return res.status(400).json({ message: "Este tipo requiere una cobertura" });

    const precio = computePrice(payload);
    const donut = await Donut.findByIdAndUpdate(req.params.id, { ...payload, precio }, { new: true, runValidators: true });
    res.json(donut);
  } catch (err) { next(err); }
}

export async function deleteDonut(req: Request, res: Response, next: NextFunction) {
  try {
    const donut = await Donut.findByIdAndDelete(req.params.id);
    if (!donut) return res.status(404).json({ message: "Donut no encontrado" });
    res.json({ message: "Donut eliminado" });
  } catch (err) { next(err); }
}
