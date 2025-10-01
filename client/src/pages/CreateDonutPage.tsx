 import { useDispatch } from "react-redux";
 import { useNavigate } from "react-router-dom";
 import { createDonut } from "../store/donuts.slice";
 import DonutForm from "../components/DonutForm";
 import type { AppDispatch } from "../store";
 export default function CreateDonutPage() {
   const dispatch = useDispatch<AppDispatch>();
   const nav = useNavigate();
   return (
     <div className="grid gap-4">
       <h1 className="text-2xl font-bold">Crear un Donut</h1>
       <DonutForm onSubmit={async (data) => { await
 dispatch(createDonut(data)); nav("/donuts"); }} />
</div> );
}