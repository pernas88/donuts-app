import { Link } from "react-router-dom";
 export default function DonutCard({ donut, onFav }: { donut: any; onFav?:
 (id: string) => void }) {
   return (
     <div className="card flex items-center justify-between">
<div>
<div className="text-sm text-gray-500">ID: {donut._id}</div> <h3 className="text-lg font-semibold">{donut.nombre}</h3> <div className="text-gray-600">{donut.tipo} ·
{donut.precio.toFixed(2)} €</div> </div>
       <div className="flex gap-2">
         {onFav && <button className="btn btn-outline" onClick={() =>
 onFav(donut._id)}>Añadir a favoritos</button>}
         <Link to={`/donuts/${donut._id}`} className="btn btn-primary">Ver
 detalle</Link>
       </div>
</div> );
}
