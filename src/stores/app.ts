import { defineStore } from "pinia";
import { ref } from "vue";

export const useAppStore = defineStore("app", () => {
  const ready = ref(true);
  const templateName = ref("Vue SSR Template");

  return {
    ready,
    templateName,
  };
});
