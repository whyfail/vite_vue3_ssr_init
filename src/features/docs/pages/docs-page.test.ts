import { screen } from "@testing-library/vue";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import DocsPage from "./DocsPage.vue";
import { renderWithApp } from "@/test/mount";

describe("DocsPage", () => {
  it("renders the SSR baseline table", () => {
    renderWithApp(DocsPage);

    expect(screen.getByRole("heading", { name: "企业级 SSR 基线" })).toBeInTheDocument();
    expect(screen.getByText("服务端渲染")).toBeInTheDocument();
  });

  it("has no obvious accessibility violations", async () => {
    const { container } = renderWithApp(DocsPage);

    expect(await axe(container)).toHaveNoViolations();
  });
});
