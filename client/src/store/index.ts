  import { configureStore } from "@reduxjs/toolkit";
  import donuts from "./donuts.slice";
  import favorites from "./favorites.slice";
  export const store = configureStore({
    reducer: { donuts, favorites }
  });
  export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;