import { Link } from "react-router-dom";
 export default function Home() {
   return (
     <div className="grid gap-4">
       <div className="card">
<h1 className="text-3xl font-bold mb-2">Bienvenido a Donut’s Giulia</h1>
<h1 className="text-3xl font-bold mb-2">Todos los Donut’s SIN LACTOSA </h1>
<p className="text-gray-700">Sistema para gestionar todos tus Donut’s: creación, listado, detalle, edición, borrado y favoritos.</p>
       </div>
       <div className="grid sm:grid-cols-2 gap-4">
<Link to="/crear" className="card hover:shadow-lg">
<h3 className="text-xl font-semibold">Creación de Donut’s</h3> <p className="text-gray-600">Añade nombre, tipo y precio.</p>
         </Link>
         <Link to="/donuts" className="card hover:shadow-lg">
<h3 className="text-xl font-semibold">Listado de Donut’s</h3>
           <p className="text-gray-600">Ver todos, ir al detalle y añadir a
 favoritos.</p>
         </Link>
       </div>
</div> );
}