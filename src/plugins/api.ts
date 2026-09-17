import { createApiClient } from "@/shared/api/http";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const baseURL = import.meta.server ? config.apiBaseUrl : config.public.apiBaseUrl;

  return {
    provide: {
      api: createApiClient(baseURL),
    },
  };
});
