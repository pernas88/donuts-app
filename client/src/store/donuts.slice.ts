import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../api/http";

export type Donut = {
  _id: string;
  nombre: string;
  tipo: string;
  precio: number;
  cobertura?: string | null;
  relleno?: string | null;
  toppings?: string[];
};

type CreateDonutPayload = {
  nombre: string;
  tipo: string;
  cobertura?: string | null;
  relleno?: string | null;
  toppings?: string[];
  precio?: number; // lo calcula el backend igualmente
};

type State = { list: Donut[]; current?: Donut; loading: boolean; error?: string };
const initialState: State = { list: [], loading: false };

export const fetchDonuts = createAsyncThunk("donuts/fetchAll", async () => api.getDonuts());
export const fetchDonut = createAsyncThunk("donuts/fetchOne", async (id: string) => api.getDonut(id));
export const createDonut = createAsyncThunk("donuts/create", async (data: CreateDonutPayload) => api.createDonut(data));
export const updateDonut = createAsyncThunk("donuts/update", async ({ id, data }: { id: string; data: Partial<CreateDonutPayload> }) => api.updateDonut(id, data));
export const deleteDonut = createAsyncThunk("donuts/delete", async (id: string) => { await api.deleteDonut(id); return id; });

const slice = createSlice({
  name: "donuts",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDonuts.pending, (s) => { s.loading = true; })
      .addCase(fetchDonuts.fulfilled, (s, a: PayloadAction<Donut[]>) => { s.loading = false; s.list = a.payload; })
      .addCase(fetchDonuts.rejected, (s, a) => { s.loading = false; s.error = String(a.error.message); })
      .addCase(fetchDonut.fulfilled, (s, a: PayloadAction<Donut>) => { s.current = a.payload; })
      .addCase(createDonut.fulfilled, (s, a: PayloadAction<Donut>) => { s.list.push(a.payload); })
      .addCase(updateDonut.fulfilled, (s, a: PayloadAction<Donut>) => {
        s.current = a.payload;
        s.list = s.list.map(d => d._id === a.payload._id ? a.payload : d);
      })
      .addCase(deleteDonut.fulfilled, (s, a: PayloadAction<string>) => {
        s.list = s.list.filter(d => d._id !== a.payload);
        if (s.current?._id === a.payload) s.current = undefined;
      });
  }
});

export default slice.reducer;
