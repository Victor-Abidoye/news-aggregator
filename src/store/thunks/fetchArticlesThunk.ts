import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchArticles } from "../../services/articlesService";
import { setArticles, setError, setLoading } from "../slices/articlesSlice";
import type { RootState } from "../index";

export const fetchArticlesThunk = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("articles/fetchAll", async (_, { getState, dispatch }) => {
  const { filters } = getState().articles;

  try {
    dispatch(setLoading(true));
    const articles = await fetchArticles({
      keyword: filters.keyword || undefined,
      dateFrom: filters.dateFrom,
      dateTo: filters.dateTo,
      categories: filters.categories,
      sources: filters.sources,
    });

    dispatch(setArticles(articles));
    dispatch(setError(undefined));
  } catch (e: unknown) {
    const maybeMessage =
      e && typeof e === "object" && "message" in (e as Record<string, unknown>)
        ? String((e as Record<string, unknown>).message)
        : String(e);
    dispatch(setError(maybeMessage));
  } finally {
    dispatch(setLoading(false));
  }
});
