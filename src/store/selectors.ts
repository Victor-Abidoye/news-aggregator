import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./index";

export const selectAllArticles = (s: RootState) => s.articles.items;
export const selectPreferences = (s: RootState) => s.preferences;

// Memoized selector for personalized articles. Returns the same array reference
// if inputs (articles + preferences) haven't changed to avoid unnecessary re-renders
export const selectPersonalizedArticles = createSelector(
  [selectAllArticles, selectPreferences],
  (items, prefs) => {
    const preferredSources = (prefs.preferredSources ?? []).map((x) =>
      x.toLowerCase()
    );
    const preferredCategories = (prefs.preferredCategories ?? []).map((x) =>
      x.toLowerCase()
    );
    const preferredAuthors = (prefs.preferredAuthors ?? []).map((x) =>
      x.toLowerCase()
    );

    const sourceSet = new Set(preferredSources);
    const categorySet = new Set(preferredCategories);
    const authorSet = new Set(preferredAuthors);

    // If no preferences are set, return items as-is (same reference)
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
