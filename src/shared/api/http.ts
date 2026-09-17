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
