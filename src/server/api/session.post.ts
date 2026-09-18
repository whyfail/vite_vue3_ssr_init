import { createError, defineEventHandler, readBody, setCookie } from "h3";

interface LoginBody {
  username?: string;
  password?: string;
  remember?: boolean;
}

export default defineEventHandler(async (event) => {
  const body = await readBody<LoginBody>(event);

  if (!body.username || !body.password) {
    throw createError({ statusCode: 400, statusMessage: "请输入账号和密码。" });
  }

  // Replace the demo value with the token returned by the real authentication service.
  setCookie(event, "auth_token", "demo-token", {
    httpOnly: true,
    maxAge: body.remember ? 60 * 60 * 24 * 30 : undefined,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return { authenticated: true };
});
