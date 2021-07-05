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
          <div class="p-col-3" style="text-align: left">
            <InputText
              type="text"
              v-model="searchObj.cardName"
              placeholder="Card Name"
            />
          </div>
          <div class="p-col-3" style="text-align: left">
            <InputText
              type="text"
              v-model="searchObj.text"
              placeholder="Text"
            />
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="p-col-12 p-md-4 p-lg-3">
          <CardItem :card="slotProps.data" />
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
// import Textarea from "primevue/textarea";
import CardItem from "@/components/CardItem.vue";

export default defineComponent({
  name: "CardListView",
  components: { DataView, InputText, CardItem },
  setup() {
    const layout = ref("grid");

    const { repositories, getCardRepositories } = useCardRepositories();
    const { filteredRepositories, searchObj, filterAndGetCadDetail } =
      useCardFilterRepositories(repositories);

    return {
      repositories,
      getCardRepositories,
      filteredRepositories,
      filterAndGetCadDetail,
      layout,
      searchObj,
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
