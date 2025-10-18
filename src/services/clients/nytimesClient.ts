import axios from "axios";
import { env } from "../../config/env";

// Using Top Stories + Article Search hybrid: here we default to Article Search for filtering
const SEARCH_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
const TOP_URL = "https://api.nytimes.com/svc/topstories/v2/home.json";

export interface NYTParams {
  q?: string;
  begin_date?: string; // YYYYMMDD
  end_date?: string; // YYYYMMDD
  section?: string;
}

export async function fetchNYT(params: NYTParams) {
  const { q, begin_date, end_date, section } = params;
  const useSearch = q || begin_date || end_date || section;
  if (useSearch) {
    const resp = await axios.get(SEARCH_URL, {
      params: {
        q,
        begin_date,
        end_date,
        fq: section ? `section_name:("${section}")` : undefined,
        "api-key": env.NYT_KEY,
      },
    });
    return resp.data;
  }
  const resp = await axios.get(TOP_URL, { params: { "api-key": env.NYT_KEY } });
  return resp.data;
}
