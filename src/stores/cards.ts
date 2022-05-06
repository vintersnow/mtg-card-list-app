import { defineStore } from "pinia";
import CardListLoader from "@/services/CardDataService";
import type { CardDetail, CardFilterObject } from "@/models";

const loader = new CardListLoader();

export const useCardStore = defineStore({
  id: "mtgCard",
  state: () => ({
    cards: [] as CardDetail[],
    filterText: null as CardFilterObject | null,
  }),
  getters: {
    filteredList: (state) => {
      if (state.filterText !== null) {
        const filterText = state.filterText;
        const regex1 = RegExp(filterText.cardName.replace(/\s+/, ".*"), "i");
        const regex2 = RegExp(filterText.text.replace(/\s+/, ".*"), "i");
        const ret = state.cards.filter((card: CardDetail) => {
          let status = true;
          if (filterText.cardName !== "") {
            status = status && (regex1.test(card.nameEnglish) || regex1.test(card.nameJapanese));
          }
          if (!status) return false;
          if (filterText.text !== "") {
            status = status && (regex2.test(card.textEnglish) || regex2.test(card.textJapanese));
          }
          return status;
        });
        return ret;
      }
      return state.cards;
    },
  },
  actions: {
    async update() {
      const list = await loader.getCardList();
      // this.cards = list.slice(0, 10);
      this.cards = list;
    },
    async get(id: string): Promise<CardDetail | null> {
      if (this.cards.length === 0) {
        await this.update();
      }
      return this.cards.find((card) => {
        return card.id === id;
      }) || null;
    },
  },
});
