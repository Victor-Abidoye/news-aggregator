import type { Article } from "../store/slices/articlesSlice";

function safeGet(obj: unknown, key: string) {
  if (
    obj &&
    typeof obj === "object" &&
    key in (obj as Record<string, unknown>)
  ) {
    return (obj as Record<string, unknown>)[key];
  }
  return undefined;
}

export function normalizeFromNewsApi(item: unknown): Article {
  const url = safeGet(item, "url");
  const title = safeGet(item, "title") ?? "";
  const description = safeGet(item, "description");
  const imageUrl = safeGet(item, "urlToImage");
  const author = safeGet(item, "author");
  const publishedAt = safeGet(item, "publishedAt");

  return {
    id: String(url ?? title),
    title: String(title),
    description: description ? String(description) : undefined,
    url: String(url ?? ""),
    imageUrl: imageUrl ? String(imageUrl) : undefined,
    author: author ? String(author) : undefined,
    publishedAt: publishedAt ? String(publishedAt) : undefined,
    source: "newsapi",
    category: safeGet(item, "category")
      ? String(safeGet(item, "category"))
      : undefined,
  };
}

export function normalizeFromGuardian(item: unknown): Article {
  const id = safeGet(item, "id");
  const webTitle = safeGet(item, "webTitle") ?? "";
  const fields = safeGet(item, "fields");
  const tags = safeGet(item, "tags");
  const sectionName = safeGet(item, "sectionName");

  const description =
    fields && typeof fields === "object"
      ? ((fields as Record<string, unknown>).trailText as unknown)
      : undefined;
  const thumbnail =
    fields && typeof fields === "object"
      ? ((fields as Record<string, unknown>).thumbnail as unknown)
      : undefined;
  const author =
    Array.isArray(tags) && tags.length > 0
      ? (tags as unknown[])[0] &&
        (((tags as unknown[])[0] as Record<string, unknown>)
          .webTitle as unknown)
      : undefined;
  const publishedAt = safeGet(item, "webPublicationDate");

  return {
    id: String(id ?? webTitle),
    title: String(webTitle),
    description: description ? String(description) : undefined,
    url: String(safeGet(item, "webUrl") ?? ""),
    imageUrl: thumbnail ? String(thumbnail) : undefined,
    author: author ? String(author) : undefined,
    publishedAt: publishedAt ? String(publishedAt) : undefined,
    source: "guardian",
    category: sectionName ? String(sectionName) : undefined,
  };
}

export function normalizeFromNYT(item: unknown): Article {
  const uri =
    safeGet(item, "uri") ?? safeGet(item, "url") ?? safeGet(item, "web_url");
  const titleRaw = safeGet(item, "title");
  const headlineRaw = safeGet(item, "headline");
  const title =
    titleRaw ??
    (headlineRaw && typeof headlineRaw === "object"
      ? (headlineRaw as Record<string, unknown>).main
      : undefined) ??
    "";
  const description = safeGet(item, "abstract") ?? safeGet(item, "snippet");
  const multimedia = safeGet(item, "multimedia");

  let imageUrl: string | undefined;
  if (Array.isArray(multimedia) && multimedia.length > 0) {
    const mm = multimedia as unknown[];
    const m =
      mm.find(
        (m2) =>
          m2 &&
          typeof m2 === "object" &&
          "url" in (m2 as Record<string, unknown>)
      ) ?? mm[0];
    const mUrl =
      m && typeof m === "object"
        ? ((m as Record<string, unknown>).url as unknown)
        : undefined;
    if (mUrl) {
      const mUrlStr = String(mUrl);
      imageUrl = mUrlStr.startsWith("http")
        ? mUrlStr
        : `https://www.nytimes.com/${mUrlStr}`;
    }
  }

  const authorObj = safeGet(item, "byline");
  const author =
    authorObj && typeof authorObj === "object"
      ? ((authorObj as Record<string, unknown>).original as unknown)
      : undefined;
  const publishedAt =
    safeGet(item, "published_date") ?? safeGet(item, "pub_date");

  return {
    id: String(uri ?? title),
    title: String(title),
    description: description ? String(description) : undefined,
    url: String(uri ?? ""),
    imageUrl,
    author: author ? String(author) : undefined,
    publishedAt: publishedAt ? String(publishedAt) : undefined,
    source: "nytimes",
    category: safeGet(item, "section")
      ? String(safeGet(item, "section"))
      : safeGet(item, "section_name")
      ? String(safeGet(item, "section_name"))
      : undefined,
  };
}
