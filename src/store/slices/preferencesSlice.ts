import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ArticleSource } from "./articlesSlice";

export interface PreferencesState {
  preferredSources: ArticleSource[];
  preferredCategories: string[];
  preferredAuthors: string[];
}

const loadInitialState = (): PreferencesState => {
  try {
    const raw = localStorage.getItem("preferences");
    if (raw) return JSON.parse(raw) as PreferencesState;
  } catch (e) {
    // ignore localStorage parse errors
    console.debug("Failed to load preferences:", String(e));
  }
  return {
    preferredSources: ["newsapi", "guardian", "nytimes"],
    preferredCategories: [],
    preferredAuthors: [],
  };
};

const initialState: PreferencesState = loadInitialState();

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setPreferredSources(state, action: PayloadAction<ArticleSource[]>) {
      state.preferredSources = action.payload;
      localStorage.setItem("preferences", JSON.stringify(state));
    },
    setPreferredCategories(state, action: PayloadAction<string[]>) {
      state.preferredCategories = action.payload;
      localStorage.setItem("preferences", JSON.stringify(state));
    },
    setPreferredAuthors(state, action: PayloadAction<string[]>) {
      state.preferredAuthors = action.payload;
      localStorage.setItem("preferences", JSON.stringify(state));
    },
  },
});

export const {
  setPreferredSources,
  setPreferredCategories,
  setPreferredAuthors,
} = preferencesSlice.actions;
export default preferencesSlice.reducer;
