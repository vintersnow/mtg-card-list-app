<script setup lang="ts">
import { computed } from 'vue'
import copyToClipboard from "@/copyToClipBoard";

import type { CardDetail } from "@/models";
const props = defineProps<{
  card: CardDetail
}>();

// const displayText = ref(false);
// const showTextModal = () => {
//   displayText.value = true;
// };
// 
const hasJapaneseTitle = computed(() => {
  return props.card.nameJapanese !== "";
});
const hasJapaneseText = computed(() => {
  return props.card.textJapanese !== "";
});
</script>

<template>
  <div class="card">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image">
            <img :src="props.card.image_urls[0]" alt="Placeholder image">
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-5 clickable" @click.stop="copyToClipboard(props.card.nameEnglish)">{{
            props.card.nameEnglish
          }}
          </p>
          <p class="subtitle is-6 clickable" v-if="hasJapaneseTitle"
            @click.stop="copyToClipboard(props.card.nameJapanese)">
            {{
              props.card.nameJapanese
            }}</p>
          <div class="content" v-if="hasJapaneseText">
            {{ props.card.textJapanese }}
          </div>
        </div>
      </div>
    </div>
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
