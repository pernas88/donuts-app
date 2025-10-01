import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites, removeFromFavorites } from "../store/favorites.slice";
import type { RootState, AppDispatch } from "../store";
import { Link } from "react-router-dom";

export default function FavoritesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, loading } = useSelector((s: RootState) => s.favorites);

  useEffect(() => { dispatch(fetchFavorites()); }, [dispatch]);

  if (loading) return <div>Cargando…</div>;

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-bold">Donut’s favoritos</h1>
      <div className="grid gap-3">
        {list.length === 0 && <div className="text-gray-600">No hay favoritos aún.</div>}
        {list.map((f: any) => (
          <div key={f._id} className="card flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">ID: {f.donutId._id}</div>
              <h3 className="text-lg font-semibold">{f.donutId.nombre}</h3>
              <div className="text-gray-600">{f.donutId.tipo} · {f.donutId.precio.toFixed(2)} €</div>
            </div>
            <div className="flex gap-2">
              <Link to={`/donuts/${f.donutId._id}`} className="btn btn-primary">Ver detalle</Link>
              <button className="btn btn-outline" onClick={() => dispatch(removeFromFavorites(f.donutId._id))}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
