import { ErrorRequestHandler } from "express";
  export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    console.error(err);
    const code = (err as any).code === 11000 ? 409 : 500; // duplicados ->
conflicto
    res.status(code).json({ message: err.message || "Error interno" });
  };