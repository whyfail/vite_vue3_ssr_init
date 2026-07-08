import type { RenderOptions } from "@testing-library/vue";
import { render } from "@testing-library/vue";

export function renderWithApp(component: unknown, options: RenderOptions<unknown> = {}) {
  return render(component, {
    global: {
      stubs: {
        NuxtLink: {
          props: ["to"],
          template: '<a :href="to"><slot /></a>',
        },
        NuxtLayout: {
          template: "<div><slot /></div>",
        },
        NuxtPage: {
          template: "<div />",
        },
      },
    },
    ...options,
  });
}
