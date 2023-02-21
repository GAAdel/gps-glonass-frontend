<template>
  <header class="header sticky top-0 shadow-lg flex justify-between text-lg font-medium bg-green-400 z-10 p-6">
    <RouterLink to="/">
      <div class="header__logo text-2xl">
        GPS/Glonass
      </div>
    </RouterLink>
    <nav class="header__nav flex justify-end hidden sm:block">
      <ul class="header__list flex gap-6">
        <li class="header__item">Main</li>
        <li class="header__item">About Us</li>
        <li class="header__item">Contacts</li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

</script>

<style scoped>

</style>