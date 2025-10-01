import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../api/http";

type Donut = { _id: string; nombre: string; tipo: string; precio: number };
type Favorite = { _id: string; donutId: Donut };

type State = { list: Favorite[]; loading: boolean };
const initialState: State = { list: [], loading: false };

export const fetchFavorites = createAsyncThunk("favorites/fetchAll", async () => api.getFavorites());
export const addToFavorites = createAsyncThunk("favorites/add", async (donutId: string) => api.addFavorite(donutId));
export const removeFromFavorites = createAsyncThunk("favorites/remove", async (donutId: string) => {
  await api.removeFavorite(donutId);
  return donutId;
});

const slice = createSlice({
  name: "favorites",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchFavorites.pending, (s) => { s.loading = true; })
      .addCase(fetchFavorites.fulfilled, (s, a: PayloadAction<Favorite[]>) => { s.loading = false; s.list = a.payload; })
      .addCase(fetchFavorites.rejected, (s) => { s.loading = false; })
      .addCase(addToFavorites.fulfilled, (s, a: PayloadAction<Favorite>) => { s.list.push(a.payload as any); })
      .addCase(removeFromFavorites.fulfilled, (s, a: PayloadAction<string>) => {
        s.list = s.list.filter(f => f.donutId._id !== a.payload);
      });
  }
});

export default slice.reducer;
