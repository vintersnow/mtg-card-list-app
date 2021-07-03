import { ref, Ref, watch } from "vue";
import { CardDetail } from "@/models";

export default function useCardFilterRepositories(
  repositories: Ref<CardDetail[]>
): {
  filteredRepositories: Ref<CardDetail[]>;
  searchText: Ref<string>;
  filterAndGetCadDetail: () => void;
} {
  const searchText = ref("");
  const filteredRepositories: Ref<CardDetail[]> = ref([]);

  const filterAndGetCadDetail = async () => {
    if (searchText.value === "") {
      filteredRepositories.value = [];
      return;
    }
    const regex = RegExp(searchText.value.replace(/\s+/, ".*"), "i");
    filteredRepositories.value = repositories.value.filter(
      (card: CardDetail) => {
        return card.nameEnglish.match(regex) || card.nameJapanese.match(regex);
      }
    );
  };

  watch(searchText, filterAndGetCadDetail);

  return {
    filteredRepositories,
    searchText,
    filterAndGetCadDetail,
  };
}
