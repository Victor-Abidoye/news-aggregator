import { format } from "date-fns";
import { fetchNewsApiEverything } from "./clients/newsapiClient";
import { fetchGuardian } from "./clients/guardianClient";
import { fetchNYT } from "./clients/nytimesClient";
import {
  normalizeFromGuardian,
  normalizeFromNYT,
  normalizeFromNewsApi,
} from "./adapter";
import type { Article, ArticleSource } from "../store/slices/articlesSlice";

export interface QueryParams {
  keyword?: string;
  dateFrom?: string; // ISO
  dateTo?: string; // ISO
  categories?: string[];
  sources?: ArticleSource[];
}

export async function fetchArticles(params: QueryParams): Promise<Article[]> {
  const {
    keyword,
    dateFrom,
    dateTo,
    categories = [],
    sources = ["newsapi", "guardian", "nytimes"],
  } = params;

  const tasks: Array<Promise<Article[]>> = [];

  if (sources.includes("newsapi")) {
    tasks.push(
      (async () => {
        try {
          const data = await fetchNewsApiEverything({
            q: keyword || "technology",
            from: dateFrom,
            to: dateTo,
            pageSize: 30,
            sources: undefined,
          });
          const articles = (data.articles ?? []).map(normalizeFromNewsApi);
          return filterByCategories(articles, categories);
        } catch (_) {
          return [];
        }
      })()
    );
  }

  if (sources.includes("guardian")) {
    tasks.push(
      (async () => {
        try {
          const data = await fetchGuardian({
            q: keyword,
            fromDate: dateFrom,
            toDate: dateTo,
            section: categories[0],
          });
          const results = data.response?.results ?? [];
          const articles = results.map(normalizeFromGuardian);
          return filterByCategories(articles, categories);
        } catch (_) {
          return [];
        }
      })()
    );
  }

  if (sources.includes("nytimes")) {
    tasks.push(
      (async () => {
        try {
          const begin_date = dateFrom
            ? format(new Date(dateFrom), "yyyyMMdd")
            : undefined;
          const end_date = dateTo
            ? format(new Date(dateTo), "yyyyMMdd")
            : undefined;
          const data = await fetchNYT({
            q: keyword,
            begin_date,
            end_date,
            section: categories[0],
          });
          const docs = data.response?.docs ?? data.results ?? [];
          const articles = docs.map(normalizeFromNYT);
          return filterByCategories(articles, categories);
        } catch (_) {
          return [];
        }
      })()
    );
  }

  const settled = await Promise.allSettled(tasks);
  const merged: Article[] = [];
  for (const s of settled) {
    if (s.status === "fulfilled") {
      merged.push(...s.value);
    }
  }

  const unique = dedupeBy(merged, (a) => a.url || a.id);
  unique.sort(
    (a, b) =>
      new Date(b.publishedAt ?? 0).getTime() -
      new Date(a.publishedAt ?? 0).getTime()
  );

  return unique;
}

function dedupeBy<T>(items: T[], key: (t: T) => string | undefined): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const it of items) {
    const k = key(it);
    if (!k) {
      out.push(it);
      continue;
    }
    if (!seen.has(k)) {
      seen.add(k);
      out.push(it);
    }
  }
  return out;
}

function filterByCategories(items: Article[], categories: string[]): Article[] {
  if (!categories.length) return items;
  const set = new Set(categories.map((c) => c.toLowerCase()));
  return items.filter((a) =>
    a.category ? set.has(a.category.toLowerCase()) : true
  );
}
