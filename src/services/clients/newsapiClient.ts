import axios from "axios";
import { env } from "../../config/env";

const BASE_URL = "https://newsapi.org/v2";

export interface NewsApiParams {
  q?: string;
  from?: string;
  to?: string;
  pageSize?: number;
  sources?: string; // comma separated source ids
}

export async function fetchNewsApiEverything(params: NewsApiParams) {
  const { q, from, to, pageSize = 30, sources } = params;
  const url = `${BASE_URL}/everything`;
  const resp = await axios.get(url, {
    params: {
      q,
      from,
      to,
      pageSize,
      sources,
      language: "en",
      sortBy: "publishedAt",
    },
    headers: { "X-Api-Key": env.NEWSAPI_KEY },
  });
  return resp.data;
}
