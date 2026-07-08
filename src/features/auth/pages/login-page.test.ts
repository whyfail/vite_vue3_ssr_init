import { screen } from "@testing-library/vue";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import LoginPage from "./LoginPage.vue";
import { renderWithApp } from "@/test/mount";

describe("LoginPage", () => {
  it("renders the login page", () => {
    renderWithApp(LoginPage);

    expect(screen.getByRole("heading", { name: "登录" })).toBeInTheDocument();
    expect(screen.getByLabelText("账号")).toBeInTheDocument();
  });

  it("has no obvious accessibility violations", async () => {
    const { container } = renderWithApp(LoginPage);

    expect(await axe(container)).toHaveNoViolations();
  });
});
