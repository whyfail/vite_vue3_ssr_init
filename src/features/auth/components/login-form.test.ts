import { screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import LoginForm from "./LoginForm.vue";
import { renderWithApp } from "@/test/mount";

describe("LoginForm", () => {
  beforeEach(() => {
    Object.defineProperty(window, "location", {
      configurable: true,
      value: {
        assign: vi.fn(),
      },
    });
  });

  it("shows validation feedback when fields are empty", async () => {
    renderWithApp(LoginForm);

    await userEvent.click(screen.getByRole("button", { name: "登录" }));

    expect(screen.getByText("请输入账号和密码。")).toBeInTheDocument();
  });

  it("stores a token after successful submit", async () => {
    renderWithApp(LoginForm);

    await userEvent.type(screen.getByLabelText("账号"), "admin");
    await userEvent.type(screen.getByLabelText("密码"), "admin");
    await userEvent.click(screen.getByRole("button", { name: "登录" }));

    expect(localStorage.getItem("cwa_ssr_token")).toBe("demo-token");
  });
});
