<template>
  <div class="card">
    <DataView
      :value="filteredRepositories"
      :layout="layout"
      :paginator="true"
      :rows="12"
    >
      <template #header>
        <div class="p-grid p-nogutter">
          <div class="p-col-6" style="text-align: left">
            <InputText type="text" v-model="searchText" />
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="p-col-12 p-md-3">
          <div class="product-grid-item inner-card">
            <div class="product-grid-item-top">
              <div class="p-col-10 p-md-10 product-name">
                <p>{{ slotProps.data.nameJapanese }}</p>
                <p>{{ slotProps.data.nameEnglish }}</p>
              </div>
              <span class="product-cost">{{ slotProps.data.manaCost }}</span>
            </div>
            <div class="product-grid-item-content">
              <img
                src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
                :alt="slotProps.data.nameEnglish"
              />
              <div class="product-card-type">{{ slotProps.data.cardType }}</div>
              <!-- <div class="product-description">{{slotProps.data.text}}</div> -->
              <Textarea
                v-model="slotProps.data.textJapanese"
                rows="5"
                cols="35"
                disabled
                v-if="slotProps.data.textJapanese != ''"
              />
              <Textarea
                v-model="slotProps.data.textEnglish"
                rows="5"
                cols="40"
                disabled
                v-else
              />
            </div>
            <div class="product-grid-item-bottom">
              <span class="product-price">${{ slotProps.data.price }}</span>
              <span class="product-stats" v-if="slotProps.data.power !== ''"
                >{{ slotProps.data.power }}/{{ slotProps.data.toughness }}</span
              >
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import InputText from "primevue/inputtext";
import DataView from "primevue/dataview";
import useCardRepositories from "@/composables/useCardRepositories";
import useCardFilterRepositories from "@/composables/useCardFilteredRepositories";
import Textarea from "primevue/textarea";

export default defineComponent({
  name: "CardListView",
  components: { DataView, InputText, Textarea },
  setup() {
    const layout = ref("grid");

    const { repositories, getCardRepositories } = useCardRepositories();
    const { filteredRepositories, searchText, filterAndGetCadDetail } =
      useCardFilterRepositories(repositories);

    return {
      repositories,
      getCardRepositories,
      filteredRepositories,
      filterAndGetCadDetail,
      layout,
      searchText,
    };
  },
});
</script>

<style lang="scss" scoped>
.card {
  /* background: #ffffff; */
  padding: 2rem;
  /* box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12); */
  border-radius: 4px;
  margin-bottom: 2rem;
}

.inner-card {
  padding: 1.5rem 0.5rem;
  /* padding-top: .5rem;    */
  /* padding-bottom: .5rem; */
  /* padding-left: 1.5rem;  */
  /* padding-right: 1.5rem; */
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
