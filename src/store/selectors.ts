import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./index";

export const selectAllArticles = (s: RootState) => s.articles.items;
export const selectPreferences = (s: RootState) => s.preferences;
export const selectArticleFilters = (s: RootState) => s.articles.filters;

export const selectPersonalizedArticles = createSelector(
  [selectAllArticles, selectPreferences, selectArticleFilters],
  (items, prefs, filters) => {
    // Preferences (from preferences slice)
    const preferredSources = (prefs.preferredSources ?? []).map((x) =>
      String(x).toLowerCase()
    );
    const preferredCategories = (prefs.preferredCategories ?? []).map((x) =>
      String(x).toLowerCase()
    );
    const preferredAuthors = (prefs.preferredAuthors ?? []).map((x) =>
      String(x).toLowerCase()
    );

    // Active filters (from articles slice) — these should take precedence when present
    const filterSources = (filters.sources ?? []).map((x) =>
      String(x).toLowerCase()
    );
    const filterCategories = (filters.categories ?? []).map((x) =>
      String(x).toLowerCase()
    );

    // Build allowed sets where article-filters (if non-empty) override preferences
    const sourceSet = new Set(
      filterSources.length ? filterSources : preferredSources
    );
    const categorySet = new Set(
      filterCategories.length ? filterCategories : preferredCategories
    );
    const authorSet = new Set(preferredAuthors);

    // If no restrictions at all, return original items by reference
    if (!sourceSet.size && !categorySet.size && !authorSet.size) return items;

    return items.filter((a) => {
      const okSource = !sourceSet.size || sourceSet.has(a.source.toLowerCase());
      const okCategory =
        !categorySet.size ||
        (a.category ? categorySet.has(a.category.toLowerCase()) : false);
      const okAuthor =
        !authorSet.size ||
        (a.author ? authorSet.has(a.author.toLowerCase()) : false);
      return okSource && okCategory && okAuthor;
    });
  }
);
