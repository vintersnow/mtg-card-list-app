<script setup lang="ts">
import type { CardDetail, CardFilterObject } from "@/models";
import { onMounted, ref, computed } from 'vue'
import { useCardStore } from "@/stores/cards";
import OuterHTMLView from "@/components/OuterHTMLView.vue";
import copyToClipboard from "@/copyToClipBoard";
// import CardItem from "@/components/CardItem.vue";
// import TextSearch from "@/components/TextSearch.vue";

const props = defineProps<{
  cardId: string
}>();
const card = ref<CardDetail | null>(null);
const store = useCardStore();

onMounted(async () => {
  console.log("onMounted");
  card.value = await store.get(props.cardId);
});
// card.value = await store.get(props.cardId);

// TODO: check nullable value
const hasJapaneseTitle = computed(() => {
  return card?.nameJapanese !== "";
});
const hasJapaneseText = computed(() => {
  return card?.textJapanese !== "";
});

const wisdomURL = computed(() => {
  if (card.value === null) {
    return null;
  }
  const name = card.value.nameEnglish.replaceAll(" ", "+");
  // console.log("name", name, card);
  return `http://wonder.wisdom-guild.net/price/${name}/`
});
const hareruyaURL = computed(() => {
  if (card.value === null) {
    return null;
  }
  // TODO: handle reversible card
  const splitedName = card.value.nameEnglish.split("//");
  console.log("split", splitedName);
  const name = splitedName[0].replaceAll(" ", "+");
  // console.log("name", name, card);
  return `https://www.hareruyamtg.com/ja/products/search?suggest_type=all&product=${name}`
});
</script>

<template>
  <div class="container">
    <h1>This is a card detail view for {{ card?.nameEnglish }}</h1>
    <div class="media">
      <div class="media-left">
        <figure class="image">
          <img :src="card?.image_urls[0]" alt="Placeholder image">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-5 clickable" @click="copyToClipboard(card?.nameEnglish)">{{ card?.nameEnglish }}
        </p>
        <p class="subtitle is-6 clickable" v-if="hasJapaneseTitle" @click="copyToClipboard(card?.nameJapanese)">
          {{
            card?.nameJapanese
          }}</p>
        <div class="content" v-if="hasJapaneseText">
          {{ card?.textJapanese }}
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-half">
        <OuterHTMLView :url="wisdomURL" v-if="wisdomURL !== null" />
      </div>
      <div class="column is-half">
        <OuterHTMLView :url="hareruyaURL" v-if="hareruyaURL !== null" />
      </div>
    </div>
    <!-- <div>                                                                                      -->
    <!--   <iframe width="600" height="300" :src="wisdomURL" frameborder="0"                        -->
    <!--     allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" -->
    <!--     v-if="wisdomURL !== null"></iframe>                                                    -->
    <!-- </div>                                                                                     -->
  </div>
</template>

<style scoped>
.media-left {
  width: 40%;
}

.clickable {
  cursor: pointer;
}
</style>
