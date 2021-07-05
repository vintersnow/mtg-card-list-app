import { ref, Ref, watch, reactive } from "vue";
import { CardDetail } from "@/models";

interface SearchObject {
  cardName: string;
  text: string;
}

export default function useCardFilterRepositories(
  repositories: Ref<CardDetail[]>
): {
  filteredRepositories: Ref<CardDetail[]>;
  searchObj: SearchObject;
  filterAndGetCadDetail: () => void;
} {
  const searchObj = reactive<SearchObject>({
    cardName: "",
    text: "",
  });
  const filteredRepositories: Ref<CardDetail[]> = ref([]);

  const filterAndGetCadDetail = async () => {
    if (searchObj.cardName === "" && searchObj.text === "") {
      filteredRepositories.value = [];
      return;
    }
    const regex1 = RegExp(searchObj.cardName.replace(/\s+/, ".*"), "i");
    const regex2 = RegExp(searchObj.text.replace(/\s+/, ".*"), "i");
    filteredRepositories.value = repositories.value.filter(
      (card: CardDetail) => {
        let status = true;
        if (searchObj.cardName !== "") {
          status =
            status &&
            (regex1.test(card.nameEnglish) || regex1.test(card.nameJapanese));
        }
        if (!status) return false;
        if (searchObj.text !== "") {
          status =
            status &&
            (regex2.test(card.textEnglish) || regex2.test(card.textJapanese));
        }
        return status;
      }
    );
  };

  watch(searchObj, filterAndGetCadDetail);

  return {
    filteredRepositories,
    searchObj,
    filterAndGetCadDetail,
  };
}
