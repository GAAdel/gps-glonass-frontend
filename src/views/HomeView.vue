<template>
  <main class="vehicles py-4">
    <h1 class="vehicles__title text-5xl mb-5">Vehicles</h1>
    <p class="vehicles__info text-lg mb-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae excepturi nisi doloremque animi eius assumenda doloribus laudantium! Laboriosam, itaque corporis.</p>
    <div class="vehicles__filters flex justify-end items-center gap-5 mb-5">
      
      <select class="block appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state"
        v-model="vehicleYear"
      >
        <option 
          v-for="year in vehiclesStore.getVehicleYears" 
          :key="year"
        >{{ year }}</option>
      </select>

      <div class="mb-5">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="minPrice">
          Min price
        </label>
        <input
          class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="minPrice"
          type="number"
          v-model="filterPrice.minPrice"
          placeholder="Min price"
          required
        />
      </div>

      <div class="mb-5">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="maxPrice">
          Max Price
        </label>
        <input
          class="inline-block shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="maxPrice"
          type="number"
          v-model="filterPrice.maxPrice"
          placeholder="Max price"
          required
        />
      </div>

    </div>
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
import { ref, reactive, watch } from 'vue';

interface IfilterValues {
  minPrice: number | null,
  maxPrice: number | null,
}

const vehiclesStore = useVehiclesStore();

vehiclesStore.fetchVehicles();

const vehicleYear = ref();

const filterPrice = reactive({
  minPrice: null,
  maxPrice: null,
} as IfilterValues);

watch(filterPrice, (filterValues) => {
  if (filterPrice.minPrice < 0) {
    filterPrice.minPrice = vehiclesStore.minPrice;
  }
  if (filterPrice.maxPrice > vehiclesStore.maxPrice || filterPrice.maxPrice < 0) {
    filterPrice.maxPrice = vehiclesStore.maxPrice;
  }
  vehiclesStore.filterVehicles(filterValues);
});

watch(vehicleYear, (newValue) => {
  vehiclesStore.setChosenYear(newValue)
  vehiclesStore.filterByYear(newValue);
});


</script>

