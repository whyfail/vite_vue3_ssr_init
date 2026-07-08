import { screen } from "@testing-library/vue";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import DocsPage from "./DocsPage.vue";
import { renderWithApp } from "@/test/mount";

describe("DocsPage", () => {
  it("renders the template guide content", () => {
    renderWithApp(DocsPage);

    expect(screen.getByRole("heading", { name: "项目开发文档" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "推荐开发流程" })).toBeInTheDocument();
    expect(screen.getByText("src/pages")).toBeInTheDocument();
  });

  it("has no obvious accessibility violations", async () => {
    const { container } = renderWithApp(DocsPage);

    expect(await axe(container)).toHaveNoViolations();
  });
});
