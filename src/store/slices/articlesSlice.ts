import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type ArticleSource = "newsapi" | "guardian" | "nytimes";

export interface Article {
  id: string;
  title: string;
  description?: string;
  url: string;
  imageUrl?: string;
  author?: string;
  publishedAt?: string; // ISO string
  source: ArticleSource;
  category?: string;
}

export interface ArticleFilters {
  keyword: string;
  dateFrom?: string; // ISO
  dateTo?: string; // ISO
  categories: string[];
  sources: ArticleSource[];
}

export interface ArticlesState {
  items: Article[];
  isLoading: boolean;
  error?: string;
  filters: ArticleFilters;
}

const initialState: ArticlesState = {
  items: [],
  isLoading: false,
  error: undefined,
  filters: {
    keyword: "",
    dateFrom: undefined,
    dateTo: undefined,
    categories: [],
    sources: ["newsapi", "guardian", "nytimes"],
  },
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | undefined>) {
      state.error = action.payload;
    },
    setArticles(state, action: PayloadAction<Article[]>) {
      state.items = action.payload;
    },
    updateFilters(state, action: PayloadAction<Partial<ArticleFilters>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters(state) {
      state.filters = initialState.filters;
    },
  },
});

export const {
  setLoading,
  setError,
  setArticles,
  updateFilters,
  clearFilters,
} = articlesSlice.actions;
export default articlesSlice.reducer;
