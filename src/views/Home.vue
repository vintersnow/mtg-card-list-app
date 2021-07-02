<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
   <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
     <div class="flex-shrink-0">
       <img class="h-12 w-12" src="../assets/logo.png" alt="ChitChat Logo">
     </div>
     <div>
       <div class="text-xl font-medium text-blue">ChitChat</div>
       <p class="text-gray-500">You have a new message!</p>
     </div>
   </div>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
  },
});
</script>
