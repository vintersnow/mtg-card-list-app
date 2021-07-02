import { ref, onMounted, Ref } from "vue";
import { CardDetail } from "@/models";
import CardListService from "@/services/CardDataService";

export default function useCardRepositories(): {
  repositories: Ref<CardDetail[]>;
  getCardRepositories: () => void;
} {
  const repositories: Ref<CardDetail[]> = ref([]);
  const services = new CardListService();
  const getCardRepositories = async () => {
    repositories.value = await services.getCardList();
    console.log("finished loading");
    console.log(repositories.value[0])
  };

  onMounted(getCardRepositories);

  return {
    repositories,
    getCardRepositories,
  };
}
