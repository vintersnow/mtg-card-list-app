import { ref, onMounted, Ref } from "vue";
import { CardSimple } from "@/models";

export default function useCardRepositories(): {
  repositories: Ref<CardSimple[]>;
  getCardRepositories: () => void;
} {
  const repositories: Ref<CardSimple[]> = ref([]);
  const getCardRepositories = async () => {
    repositories.value = [
      { id: 0, name: "aaa" },
      { id: 1, name: "bbb" },
      { id: 2, name: "bbb aaa" },
      { id: 3, name: "bbb aaa" },
    ];
  };

  onMounted(getCardRepositories);

  return {
    repositories,
    getCardRepositories,
  };
}
