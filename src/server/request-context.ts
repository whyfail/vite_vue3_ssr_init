import type { H3Event } from "h3";
import { getCookie } from "h3";

export function getRequestContext(event: H3Event) {
  return {
    event,
    runtime: "node",
    token: getCookie(event, "auth_token"),
  };
}
