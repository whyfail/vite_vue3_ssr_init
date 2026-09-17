import { defineEventHandler, getCookie, getRequestURL, sendRedirect } from "h3";

export default defineEventHandler((event) => {
  const pathname = getRequestURL(event).pathname;

  if (pathname.startsWith("/docs") && !getCookie(event, "cwa_token")) {
    return sendRedirect(event, "/login", 302);
  }
});
