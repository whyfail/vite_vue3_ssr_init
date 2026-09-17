import { screen, waitFor } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import LoginForm from "./LoginForm.vue";
import { renderWithApp } from "@/test/mount";

describe("LoginForm", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));
  });

  it("shows validation feedback when fields are empty", async () => {
    renderWithApp(LoginForm);

    await userEvent.clear(screen.getByLabelText("账号"));
    await userEvent.clear(screen.getByLabelText("密码"));
    await userEvent.click(screen.getByRole("button", { name: "登录" }));

    expect(screen.getByText("请输入账号和密码。")).toBeInTheDocument();
  });

  it("creates a server session after successful submit", async () => {
    renderWithApp(LoginForm);

    await userEvent.type(screen.getByLabelText("账号"), "admin");
    await userEvent.type(screen.getByLabelText("密码"), "admin");
    await userEvent.click(screen.getByLabelText("记住账号"));
    await userEvent.click(screen.getByRole("button", { name: "登录" }));

    await waitFor(() => expect(fetch).toHaveBeenCalledOnce());
  });
});
