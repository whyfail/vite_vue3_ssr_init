import axios from "axios";

export function createApiClient(baseURL = "/api") {
  return axios.create({
    baseURL,
    timeout: 15_000,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export const apiClient = createApiClient(
  typeof window === "undefined"
    ? process.env.NUXT_API_BASE_URL || process.env.NUXT_PUBLIC_API_BASE_URL || "/api"
    : process.env.NUXT_PUBLIC_API_BASE_URL || "/api",
);
