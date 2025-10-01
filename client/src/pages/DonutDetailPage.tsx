import { Link, useNavigate, useParams } from "react-router-dom";
 import { useDispatch, useSelector } from "react-redux";
 import { useEffect } from "react";
 import { deleteDonut, fetchDonut, updateDonut } from "../store/donuts.slice";
  import type { RootState, AppDispatch } from "../store";
 import DonutDetail from "../components/DonutDetail";
 export default function DonutDetailPage() {
   const { id } = useParams();
   const nav = useNavigate();
   const dispatch = useDispatch<AppDispatch>();
   const donut = useSelector((s: RootState) => s.donuts.current);
   useEffect(() => { if (id) dispatch(fetchDonut(id)); }, [id, dispatch]);
if (!donut) return <div>Cargando...</div>;
   return (
     <div className="grid gap-4">
       <div className="flex items-center gap-3">
         <Link to="/" className="btn">Volver al inicio</Link>
         <Link to="/donuts" className="btn">Volver al listado</Link>
</div>
       <DonutDetail donut={donut} onUpdate={(data) => id &&
 dispatch(updateDonut({ id, data }))} />
       <button className="btn btn-outline" onClick={async () => { if (id) {
 await dispatch(deleteDonut(id)); nav("/"); } }}>Eliminar Donut</button>
</div> );
}