import { defineEventHandler, setCookie } from "h3";
import { backendFetch } from "@/server/backend";
import { getAuthMockEnabled } from "@/server/config/auth-mock";

const SESSION_COOKIE = "auth_token";

export default defineEventHandler(async (event) => {
  // Mock 模式没有真实后端会话，跳过撤销调用
  if (!getAuthMockEnabled()) {
    try {
      await backendFetch(event, "/logout", { method: "POST" });
    } catch (error) {
      // 后端不可达时本地登出仍必须成功：清除 Cookie 是安全边界，撤销失败仅记录
      console.error("后端会话撤销失败，本地会话仍将清除", error);
    }
  }

  setCookie(event, SESSION_COOKIE, "", {
    httpOnly: true,
    maxAge: 0,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return null;
});
