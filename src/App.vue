<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div id="mainNavbar" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item">
            <RouterLink to="/">Home</RouterLink>
          </a>
          <a class="navbar-item">
            <RouterLink to="/about">Abount</RouterLink>
          </a>
        </div>
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<style lang="scss">
@import "bulma/bulma.sass";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* margin-top: 30px; */
}
</style>
