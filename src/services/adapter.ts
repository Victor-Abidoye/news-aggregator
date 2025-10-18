import type { Article } from "../store/slices/articlesSlice";

export function normalizeFromNewsApi(item: any): Article {
  return {
    id: item.url,
    title: item.title,
    description: item.description ?? undefined,
    url: item.url,
    imageUrl: item.urlToImage ?? undefined,
    author: item.author ?? undefined,
    publishedAt: item.publishedAt ?? undefined,
    source: "newsapi",
    category: item.category ?? undefined,
  };
}

export function normalizeFromGuardian(item: any): Article {
  return {
    id: item.id,
    title: item.webTitle,
    description: item.fields?.trailText ?? undefined,
    url: item.webUrl,
    imageUrl: item.fields?.thumbnail ?? undefined,
    author: item.tags?.[0]?.webTitle ?? undefined,
    publishedAt: item.webPublicationDate ?? undefined,
    source: "guardian",
    category: item.sectionName ?? undefined,
  };
}

export function normalizeFromNYT(item: any): Article {
  const multimedia =
    item.multimedia?.find((m: any) => m.url) ?? item.multimedia?.[0];
  return {
    id: item.uri ?? item.url ?? item.web_url,
    title: item.title ?? item.headline?.main,
    description: item.abstract ?? item.snippet ?? undefined,
    url: item.url ?? item.web_url,
    imageUrl: multimedia
      ? multimedia.url?.startsWith("http")
        ? multimedia.url
        : `https://www.nytimes.com/${multimedia.url}`
      : undefined,
    author: item.byline?.original ?? undefined,
    publishedAt: item.published_date ?? item.pub_date ?? undefined,
    source: "nytimes",
    category: item.section ?? item.section_name ?? undefined,
  };
}
