<template>
  <div class="min-h-screen bg-white font-Roboto">

    <TheHeader />

    <AppContainer>
      <RouterView />
    </AppContainer>

    <TheFooter />
    
  </div>
</template>

<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue'
import AppContainer from '@/components/AppContainer.vue';
import TheFooter from '@/components/TheFooter.vue'
import { RouterView } from 'vue-router';
</script>