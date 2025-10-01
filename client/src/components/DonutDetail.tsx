import { useMemo, useState } from "react";

type BaseType = "clasico" | "berlina" | "cruffin" | "mini";

const BASE_LABEL: Record<BaseType, string> = { clasico: "Clásico", berlina: "Berlina", cruffin: "Cruffin", mini: "Mini" };
const LABEL_TO_BASE = { "Clásico": "clasico", "Berlina": "berlina", "Cruffin": "cruffin", "Mini": "mini" } as const;

const BASE_PRICES: Record<BaseType, number> = { clasico: 1.2, berlina: 1.5, cruffin: 1.8, mini: 0.9 };
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
  "Nibs de cacao": 0.2, "Sprinkles de colores": 0.1, "Galleta Lotus": 0.3, "Frutos rojos liofilizados": 0.3
};

const fmt = (n: number) => n.toFixed(2) + " €";

export default function DonutDetail({ donut, onUpdate }: { donut: any; onUpdate: (data: any) => void }) {
  const [edit, setEdit] = useState(false);

  if (!edit) {
    return (
      <div className="card grid gap-2">
        <h2 className="text-xl font-bold">{donut.nombre}</h2>
        <div className="text-gray-700">Tipo: {donut.tipo}</div>
        {donut.cobertura && <div className="text-gray-700">Cobertura: {donut.cobertura}</div>}
        {donut.relleno && <div className="text-gray-700">Relleno: {donut.relleno}</div>}
        {donut.toppings?.length > 0 && <div className="text-gray-700">Toppings: {donut.toppings.join(", ")}</div>}
        <div className="text-gray-700">Precio: {donut.precio.toFixed(2)} €</div>
        <div className="flex gap-2 mt-2">
          <button className="btn btn-outline" onClick={() => setEdit(true)}>Editar</button>
        </div>
      </div>
    );
  }

  // Modo edición (mismas reglas que el form de creación)
  const initialBase = (LABEL_TO_BASE as any)[donut.tipo] as BaseType || "clasico";
  const [base, setBase] = useState<BaseType>(initialBase);
  const [nombre, setNombre] = useState<string>(donut.nombre || "");
  const [coverage, setCoverage] = useState<string>(donut.cobertura || "");
  const [filling, setFilling] = useState<string>(donut.relleno || "");
  const [toppings, setToppings] = useState<string[]>(donut.toppings || []);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const isCoverageFlow = base === "clasico" || base === "cruffin" || base === "mini";
  const isFillingFlow = base === "berlina";

  const price = useMemo(() => {
    const basePrice = BASE_PRICES[base] ?? 0;
    const addMain = isCoverageFlow ? (COVER_SUPPLEMENTS[coverage] ?? 0) : isFillingFlow ? (FILL_SUPPLEMENTS[filling] ?? 0) : 0;
    const addTops = toppings.reduce((s, t) => s + (TOPPINGS[t] ?? 0), 0);
    return Math.round((basePrice + addMain + addTops) * 100) / 100;
  }, [base, coverage, filling, toppings, isCoverageFlow, isFillingFlow]);

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (!nombre.trim()) e.nombre = "El nombre es obligatorio";
    if (isCoverageFlow && !coverage) e.coverage = "Selecciona una cobertura";
    if (isFillingFlow && !filling) e.filling = "Selecciona un relleno";
    return e;
  }, [nombre, isCoverageFlow, isFillingFlow, coverage, filling]);

  const isValid = Object.keys(errors).length === 0;
  const toggleTopping = (t: string) => setToppings(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ nombre: true, coverage: true, filling: true });
    if (!isValid) return;
    onUpdate({
      nombre: nombre.trim(),
      tipo: { clasico: "Clásico", berlina: "Berlina", cruffin: "Cruffin", mini: "Mini" }[base],
      // precio lo recalcula el backend
      cobertura: isCoverageFlow ? coverage : null,
      relleno: isFillingFlow ? filling : null,
      toppings
    });
    setEdit(false);
  };

  const tabBtn = (key: BaseType) => (
    <button type="button" onClick={() => { setBase(key); setCoverage(""); setFilling(""); }} className={`px-3 py-2 rounded-xl border ${base === key ? "bg-pink-600 text-white border-pink-600" : "bg-white text-pink-700 border-pink-300"}`} aria-pressed={base === key}>
      {({ clasico: "Clásico", berlina: "Berlina", cruffin: "Cruffin", mini: "Mini" } as any)[key]}
    </button>
  );

  return (
    <form className="card grid gap-4" onSubmit={submit} noValidate>
      <div className="flex flex-wrap gap-2">{tabBtn("clasico")}{tabBtn("berlina")}{tabBtn("cruffin")}{tabBtn("mini")}</div>

      <div>
        <label className="label" htmlFor="nombre">Nombre del Donut</label>
        <input id="nombre" className="input" value={nombre} onChange={e => setNombre(e.target.value)} onBlur={() => setTouched(t => ({ ...t, nombre: true }))} required />
        {touched.nombre && errors.nombre && <div className="text-sm text-red-600 mt-1">{errors.nombre}</div>}
      </div>

      {isCoverageFlow && (
        <div>
          <label className="label" htmlFor="coverage">Cobertura</label>
          <select id="coverage" className="input" value={coverage} onChange={e => setCoverage(e.target.value)} onBlur={() => setTouched(t => ({ ...t, coverage: true }))} required>
            <option value="">— Elige cobertura —</option>
            {Object.entries(COVER_SUPPLEMENTS).map(([opt, extra]) => <option key={opt} value={opt}>{opt} {extra ? `(+${fmt(extra)})` : ""}</option>)}
          </select>
          {touched.coverage && errors.coverage && <div className="text-sm text-red-600 mt-1">{errors.coverage}</div>}
        </div>
      )}

      {isFillingFlow && (
        <div>
          <label className="label" htmlFor="filling">Relleno</label>
          <select id="filling" className="input" value={filling} onChange={e => setFilling(e.target.value)} onBlur={() => setTouched(t => ({ ...t, filling: true }))} required>
            <option value="">— Elige relleno —</option>
            {Object.entries(FILL_SUPPLEMENTS).map(([opt, extra]) => <option key={opt} value={opt}>{opt} {extra ? `(+${fmt(extra)})` : ""}</option>)}
          </select>
          {touched.filling && errors.filling && <div className="text-sm text-red-600 mt-1">{errors.filling}</div>}
        </div>
      )}

      <div>
        <div className="label mb-1">Toppings extra (opcional)</div>
        <div className="grid sm:grid-cols-2 gap-2">
          {Object.entries(TOPPINGS).map(([opt, extra]) => {
            const id = `top-${opt}`;
            const checked = toppings.includes(opt);
            return (
              <label key={opt} htmlFor={id} className={`flex items-center gap-2 p-2 border rounded-xl cursor-pointer ${checked ? "bg-pink-50 border-pink-300" : "bg-white"}`}>
                <input id={id} type="checkbox" className="accent-pink-600" checked={checked} onChange={() => toggleTopping(opt)} />
                <span className="flex-1">{opt}</span>
                <span className="text-sm text-gray-600">+{fmt(extra)}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between bg-pink-50 border border-pink-200 rounded-xl px-3 py-2">
        <div className="text-sm text-gray-700 space-y-0.5">
          <div>Tipo: <strong>{{ clasico: "Clásico", berlina: "Berlina", cruffin: "Cruffin", mini: "Mini" }[base]}</strong> ({fmt(BASE_PRICES[base])})</div>
          <div>
            {isCoverageFlow && coverage && <>Cobertura: <strong>{coverage}</strong> (+{fmt(COVER_SUPPLEMENTS[coverage] ?? 0)})</>}
            {isFillingFlow && filling && <>Relleno: <strong>{filling}</strong> (+{fmt(FILL_SUPPLEMENTS[filling] ?? 0)})</>}
          </div>
          <div>Toppings: <strong>{fmt(toppings.reduce((s, t) => s + (TOPPINGS[t] ?? 0), 0))}</strong></div>
        </div>
        <div className="text-xl font-bold text-pink-700">{fmt(price)}</div>
      </div>

      <div className="flex gap-2">
        <button className="btn btn-primary disabled:opacity-60" type="submit">Guardar cambios</button>
        <button type="button" className="btn" onClick={() => setEdit(false)}>Cancelar</button>
      </div>
    </form>
  );
}
