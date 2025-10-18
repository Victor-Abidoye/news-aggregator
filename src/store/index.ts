import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "../store/slices/articlesSlice";
import preferencesReducer from "../store/slices/preferencesSlice";

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    preferences: preferencesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
