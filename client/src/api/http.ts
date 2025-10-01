
  const BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";
  async function request<T>(path: string, options: RequestInit = {}):
  Promise<T> {const res = await fetch(`${BASE}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
}
  export const api = {
    // Donuts
    getDonuts: () => request("/api/donuts"),
    getDonut: (id: string) => request(`/api/donuts/${id}`),
    createDonut: (data: any) => request("/api/donuts", { method: "POST", body:
  JSON.stringify(data) }),
    updateDonut: (id: string, data: any) => request(`/api/donuts/${id}`, {
  method: "PUT", body: JSON.stringify(data) }),
    deleteDonut: (id: string) => request(`/api/donuts/${id}`, { method:
"DELETE" }),
// Favoritos
    getFavorites: () => request("/api/favorites"),
    isFavorite: (donutId: string) => request(`/api/favorites/${donutId}`),
    addFavorite: (donutId: string) => request("/api/favorites", { method:
  "POST", body: JSON.stringify({ donutId }) }),
    removeFavorite: (donutId: string) => request(`/api/favorites/${donutId}`,
  { method: "DELETE" })
  }