<script setup lang="ts">
import type { CardDetail, CardFilterObject } from "@/models";
import { onMounted } from 'vue'
import { useCardStore } from "@/stores/cards";
import CardItem from "@/components/CardItem.vue";
import TextSearch from "@/components/TextSearch.vue";
import router from "@/router/index";

const store = useCardStore();
onMounted(() => {
  console.log("onMounted");
  store.update();
});

const searchText = (value: string) => {
  store.filterText = {
    cardName: value,
    text: ""
  };
};

const moveToDetail = (cardId: string) => {
  // router.push({ name: 'card', params: { cardId: cardId } });
  router.push({ path: `/card/${cardId}` });
}
console.log(router);

</script>

<template>
  <div class="container">
    <h1>This is a card list view</h1>
    <TextSearch @textDidChange="searchText" />
    <div class="columns is-multiline">
      <!-- <div class="column is-half" v-for="index in Math.min(10, store.cards.length)" :key="store.cards[index].id"> -->
      <!-- <CardItem :card="store.cards[index]" /> -->
      <div class="column is-half" v-for="card in store.filteredList.slice(0, 10)" :key="card.id">
        <CardItem @click="moveToDetail(card.id)" :card="card" />
      </div>
    </div>
  </div>
</template>
