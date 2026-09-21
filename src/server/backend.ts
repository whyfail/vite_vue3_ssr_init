import type { H3Event } from "h3";
import { getCookie } from "h3";
import { getBackendApiBaseUrl } from "./config/backend";

// 服务端转发：从 HttpOnly Cookie 读取 token 并转换为 Bearer 请求后端。
// 只能在 Nitro 服务端路由中使用；$fetch 由 Nitro 运行时提供。
export async function backendFetch(
  event: H3Event,
  path: string,
  init?: { method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"; body?: Record<string, unknown> },
) {
  const token = getCookie(event, "auth_token");

  return $fetch.raw(`${getBackendApiBaseUrl()}${path}`, {
    method: init?.method ?? "GET",
    body: init?.body,
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    ignoreResponseError: true,
  });
}
