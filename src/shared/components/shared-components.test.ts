import { screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import Loading from "./Loading.vue";
import { renderWithApp } from "@/test/mount";

describe("shared components", () => {
  it("renders loading state", () => {
    renderWithApp(Loading, {
      props: {
        label: "处理中",
      },
    });

    expect(screen.getByRole("status")).toHaveTextContent("处理中");
  });
});
