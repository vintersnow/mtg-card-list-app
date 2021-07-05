<template>
  <div class="product-grid-item inner-card">
    <div class="product-grid-item-top">
      <div class="p-col-10 p-md-10 product-name">
        <div
          class="p-text-nowrap p-text-truncate"
          @click="copyToClipboard(card.nameJapanese)"
        >
          {{ card.nameJapanese }}
        </div>
        <div
          class="p-text-nowrap p-text-truncate"
          @click="copyToClipboard(card.nameEnglish)"
        >
          {{ card.nameEnglish }}
        </div>
      </div>
      <span class="product-cost">{{ card.manaCost }}</span>
    </div>
    <div class="product-grid-item-content">
      <!-- <img                                                                          -->
      <!--   src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" -->
      <!--   :alt="card.nameEnglish"                                           -->
      <!-- />                                                                            -->
      <div class="product-card-type">{{ card.cardType }}</div>
      <div
        class="p-text-left card-text-box overflow"
        @click="showTextModal"
        v-if="card.textJapanese != ''"
      >
        {{ card.textJapanese }}
      </div>
      <div
        class="p-text-left card-text-box overflow"
        @click="showTextModal"
        v-else
      >
        {{ card.textEnglish }}
      </div>
    </div>
    <div class="product-grid-item-bottom">
      <span class="product-price">${{ card.price }}</span>
      <span class="product-stats" v-if="card.power !== ''"
        >{{ card.power }}/{{ card.toughness }}</span
      >
    </div>
  </div>
  <Dialog
    :style="{ width: '50vw' }"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    v-model:visible="displayText"
  >
    <template #header>
      <p>{{ card.nameJapanese }}</p>
      <p>{{ card.nameEnglish }}</p>
    </template>
    <div class="p-text-left card-text-box" v-if="card.textJapanese != ''">
      {{ card.textJapanese }}
    </div>
    <div class="p-text-left card-text-box" v-else>{{ card.textEnglish }}</div>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { CardDetail } from "@/models";
import Dialog from "primevue/dialog";

export default defineComponent({
  name: "CardItem",
  components: { Dialog },
  props: {
    card: {
      type: Object as PropType<CardDetail>,
      required: true,
    },
  },
  setup() {
    const displayText = ref(false);
    const showTextModal = () => {
      displayText.value = true;
    };

    const copyToClipboard = async (cardName: string) => {
      await navigator.clipboard.writeText(cardName);
    };

    return {
      displayText,
      showTextModal,
      copyToClipboard,
    };
  },
});
</script>

<style lang="scss" scoped>
.card-text {
  opacity: 0.8;
}

.card {
  /* background: #ffffff; */
  padding: 2rem;
  /* box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12); */
  border-radius: 4px;
  margin-bottom: 2rem;
}

.card-text-box {
  /* height:  8rem; */
  margin: 0 1rem;
  overflow: hidden;
  font: 1em/1em "Open Sans", sans-serif;
  --lh: 1.2rem;
  line-height: var(--lh);
}
.overflow {
  --max-lines: 5;
  position: relative;
  max-height: calc(var(--lh) * var(--max-lines));
  overflow: hidden;
  padding-right: 1rem; /* space for ellipsis */
}
.overflow::before {
  position: absolute;
  content: "...";
  /*   inset-block-end: 0;
  inset-inline-end: 0; */
  bottom: 0;
  right: 0;
}
.overflow::after {
  content: "";
  position: absolute;
  /*   inset-inline-end: 0; */
  right: 0;
  width: 1rem;
  height: 1rem;
  background: white;
}

.inner-card {
  padding: 1.5rem 0.5rem;
  border-radius: 4px;
  margin-bottom: 2rem;
}

.product-name {
  font-size: 1rem;
  font-weight: 800;
  text-align: left;
  /* vertical-align: right; */
  p {
    margin: 0;
  }
}

.product-description {
  margin: 0 0 1rem 0;
}

.product-card-type {
  font-size: 1rem;
  text-align: left;
  font-weight: 600;
  vertical-align: right;
}

.product-stats {
  font-weight: 600;
  vertical-align: middle;
}

.product-cost {
  font-weight: 500;
  vertical-align: middle;
}
/* .product- */

.product-category-icon {
  vertical-align: middle;
  margin-right: 0.5rem;
}

.product-category {
  font-weight: 600;
  vertical-align: middle;
}

::v-deep(.product-grid-item) {
  margin: 0.5rem;
  border: 1px solid #dee2e6;

  .product-grid-item-top,
  .product-grid-item-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  img {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin: 1rem 0;
  }

  .product-grid-item-content {
    text-align: center;
  }

  .product-price {
    font-size: 1rem;
    font-weight: 600;
  }
}

@media screen and (max-width: 576px) {
  .product-list-item {
    flex-direction: column;
    align-items: center;

    img {
      margin: 1rem 0;
    }

    .product-list-detail {
      text-align: center;
    }

    .product-price {
      align-self: center;
    }

    .product-list-action {
      display: flex;
      flex-direction: column;
    }

    .product-list-action {
      margin-top: 2rem;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
  }
}
</style>
