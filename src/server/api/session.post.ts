import { createError, defineEventHandler, readBody, setCookie } from "h3";
import { getAuthMockEnabled } from "@/server/config/auth-mock";
import { getBackendApiBaseUrl } from "@/server/config/backend";
import type { LoginResponse, Problem } from "@/server/contract";

interface LoginBody {
  username?: string;
  password?: string;
  remember?: boolean;
}

const SESSION_COOKIE = "auth_token";

// 43+ 字符的 Mock token，仅在显式开启 NUXT_ENABLE_AUTH_MOCK 时使用
const MOCK_TOKEN = "mock-opaque-token-abcdefghijklmnopqrstuvwxyz0123456789abcdef";

export default defineEventHandler(async (event) => {
  const body = await readBody<LoginBody>(event);

  if (!body.username || !body.password) {
    throw createError({ statusCode: 400, statusMessage: "请输入账号和密码。" });
  }

  if (getAuthMockEnabled()) {
    setSessionCookie(event, MOCK_TOKEN, new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString());

    return { authenticated: true };
  }

  const upstream = await $fetch.raw<LoginResponse>(`${getBackendApiBaseUrl()}/login`, {
    method: "POST",
    body: { username: body.username, password: body.password, remember: body.remember },
    ignoreResponseError: true,
  });

  if (!upstream.ok || !upstream._data) {
    // 错误响应透传 Problem Details 顶层 code/msg/requestId；响应体可能不是 JSON，此时回退到通用提示
    const problem = (upstream._data ?? null) as unknown as Problem | null;
    const message = problem?.msg || "登录失败，请检查账号和密码。";

    throw createError({
      statusCode: upstream.status,
      statusMessage: message,
      data: { code: problem?.code, msg: message, requestId: problem?.requestId },
    });
  }

  setSessionCookie(event, upstream._data.token, upstream._data.expiresAt);

  return { authenticated: true };
});

function setSessionCookie(
  event: Parameters<typeof setCookie>[0],
  token: string,
  expiresAt: string,
) {
  // Cookie 生命周期不超过后端会话过期时间
  const maxAge = Math.max(0, Math.floor((Date.parse(expiresAt) - Date.now()) / 1000));

  setCookie(event, SESSION_COOKIE, token, {
    httpOnly: true,
    maxAge,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}
