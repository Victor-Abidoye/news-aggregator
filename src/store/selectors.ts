import type { RootState } from "./index";

export const selectAllArticles = (s: RootState) => s.articles.items;
export const selectPreferences = (s: RootState) => s.preferences;

export const selectPersonalizedArticles = (s: RootState) => {
  const items = s.articles.items;
  const prefs = s.preferences;
  const sourceSet = new Set(prefs.preferredSources.map((x) => x.toLowerCase()));
  const categorySet = new Set(
    prefs.preferredCategories.map((x) => x.toLowerCase())
  );
  const authorSet = new Set(prefs.preferredAuthors.map((x) => x.toLowerCase()));
  return items.filter((a) => {
    const okSource = !sourceSet.size || sourceSet.has(a.source.toLowerCase());
    const okCategory =
      !categorySet.size ||
      (a.category ? categorySet.has(a.category.toLowerCase()) : false) ||
      !prefs.preferredCategories.length;
    const okAuthor =
      !authorSet.size ||
      (a.author ? authorSet.has(a.author.toLowerCase()) : false) ||
      !prefs.preferredAuthors.length;
    return okSource && okCategory && okAuthor;
  });
};
