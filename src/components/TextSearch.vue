<script setup lang="ts">
import { ref } from 'vue'

interface Emits {
  (e: "textDidChange", value: string): void;
}
const emit = defineEmits<Emits>();

const nameInput = ref('');

const textDidChange = (event) => {
  // console.log(event, event.target.value);
  nameInput.value = event.target.value;
  emit('textDidChange', event.target.value);
};
</script>

<template>
  <div class="field">
    <label class="label">Card Name</label>
    <div class="control">
      <input :value="nameInput" @input="textDidChange" class="input" type="text" placeholder="Card Name">
    </div>
  </div>
</template>
