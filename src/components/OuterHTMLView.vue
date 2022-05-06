<script setup lang="ts">
const props = defineProps<{
  url: string
}>();
</script>

<template>
  <figure class="image is-4by3">
    <!-- <iframe class="is-full" :src="props.url" frameborder="0" -->
    <iframe class="has-ratio" width="600" height="300" :src="props.url" frameborder="0"
      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
  </figure>
</template>
