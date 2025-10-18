import axios from "axios";
import { env } from "../../config/env";

const BASE_URL = "https://content.guardianapis.com";

export interface GuardianParams {
  q?: string;
  fromDate?: string;
  toDate?: string;
  section?: string; // category/section id
}

export async function fetchGuardian(params: GuardianParams) {
  const { q, fromDate, toDate, section } = params;
  const url = `${BASE_URL}/search`;
  const resp = await axios.get(url, {
    params: {
      q,
      "from-date": fromDate,
      "to-date": toDate,
      section,
      "page-size": 30,
      "show-fields": "trailText,thumbnail",
      "show-tags": "contributor",
      "api-key": env.GUARDIAN_KEY,
    },
  });
  return resp.data;
}
