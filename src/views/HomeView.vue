<template>
  <main class="vehicles py-4">
    <h1 class="vehicles__title text-5xl mb-5">Vehicles</h1>
    <p class="vehicles__info text-lg mb-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae excepturi nisi doloremque animi eius assumenda doloribus laudantium! Laboriosam, itaque corporis.</p>
    <div class="vehicles__list flex flex-wrap justify-between items-center">
      <div
        class="vehicles__item w-full sm:w-[48%]" 
        v-for="vehicle in vehiclesStore.vehicles" :key="vehicle.id"
      >
        <AppCard :item="vehicle"/>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import AppCard from '@/components/AppCard.vue'
import { useVehiclesStore } from '@/stores/vehicles';

const vehiclesStore = useVehiclesStore();

vehiclesStore.fetchVehicles();

</script>

