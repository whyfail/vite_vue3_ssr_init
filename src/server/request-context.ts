export function getRequestContext(event: unknown) {
  return {
    event,
    runtime: "node",
  };
}
