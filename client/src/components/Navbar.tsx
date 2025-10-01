 import { Link, NavLink } from "react-router-dom";
  export default function Navbar() {
    const link = "px-4 py-2 rounded-xl hover:bg-pink-50";
    const active = ({ isActive }: any) => isActive ? link + " bg-pink-100" :
  link;
    return (
      <nav className="flex items-center justify-between mb-6">
        <Link to="/" className="text-2xl font-extrabold text-pink-700">Donut ’ s</Link>
<div className="flex gap-2">
<NavLink className={active} to="/">Home</NavLink>
<NavLink className={active} to="/crear">Creación de Donut’s</NavLink> <NavLink className={active} to="/donuts">Listado de Donut’s</NavLink> <NavLink className={active} to="/favoritos">Favoritos</NavLink> <NavLink className={active} to="/contacto">Contacto</NavLink>
       </div>
     </nav>
); }
