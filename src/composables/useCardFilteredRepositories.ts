import { ref, Ref, watch } from "vue";
import { CardSimple, CardDetail } from "@/models";

export default function useCardFilterRepositories(
  repositories: Ref<CardSimple[]>
): {
  filteredRepositories: Ref<CardDetail[]>;
  searchText: Ref<string>;
  filterAndGetCadDetail: () => void;
} {
  const searchText = ref("");
  const filteredRepositories: Ref<CardDetail[]> = ref([]);

  const filterAndGetCadDetail = async () => {
    // console.log(searchText, repositories, filteredRepositories)
    if (searchText.value === "") {
      filteredRepositories.value = [];
      return;
    }
    filteredRepositories.value = repositories.value
      .filter((card: CardSimple) => card.name.match(searchText.value))
      .map((card) => {
        const ret: CardDetail = {
          id: card.id,
          cardType: "ソーサリー",
          nameEnglish: card.name + "_en",
          nameJapanese: card.name + "_ja",
          text: "placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder placeholder",
          cost: "4RR",
          power: "",
          toughness: "",
          price: 10,
        };
        return ret;
      });
  };

  watch(searchText, filterAndGetCadDetail);

  return {
    filteredRepositories,
    searchText,
    filterAndGetCadDetail,
  };
}
