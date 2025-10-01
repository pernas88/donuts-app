 import { useEffect } from "react";
 import { useDispatch, useSelector } from "react-redux";
 import { fetchDonuts } from "../store/donuts.slice";
 import { addToFavorites } from "../store/favorites.slice";
 import type { RootState, AppDispatch } from "../store";
 import DonutCard from "./DonutCard";
 export default function DonutList() {
   const dispatch = useDispatch<AppDispatch>();
   const { list, loading } = useSelector((s: RootState) => s.donuts);
   useEffect(() => { dispatch(fetchDonuts()); }, [dispatch]);
if (loading) return <div>Cargando...</div>;
   return (
     <div className="grid gap-3">
       {list.map(d => (
         <DonutCard key={d._id} donut={d} onFav={(id) =>
 dispatch(addToFavorites(id))} />
       ))}
</div> );
}
