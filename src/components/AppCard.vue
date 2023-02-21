<template>
  <div class="card bg-gray-200 rounded-md shadow-lg p-6 mb-5">
    <div class="card__header flex justify-between text-2xl mb-5">
      <div class="card__title lg:text-4xl">{{ item.name }} {{ item.model }}</div>
      <div class="card__title bg-green-400 text-white rounded-md px-3 py-2">{{ item.year }}</div>
    </div>
    <div class="card__body relative">
      <picture class="card__picture block relative aspect-[4/3] mb-5">
        <img class="card__image absolute left-0 top-0 w-full h-full object-cover" src="https://glonassgps.biz/wp-content/uploads/2022/12/commercheskiy_transport.png" alt="card">
      </picture>
      <router-link :to="{ name: 'vehicle', params: {id: item.id} }" 
      class="
        card__description
        text-lg
        inline-block
        max-w-full
        after:content-['']
        after:absolute
        after:top-0
        after:left-0
        after:w-full
        after:h-full
        mb-5"
      >Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error sint repellat nam saepe quidem cum similique molestias officia veniam magni. Magnam libero qui a! Praesentium, sunt repellat hic laborum ullam repellendus tempore odit? Soluta numquam tenetur neque odio earum saepe aut quis dolor illo. Exercitationem odio ratione voluptatum possimus excepturi praesentium ex, voluptatem asperiores id distinctio, perferendis tempore quo soluta totam pariatur? Aut amet quos quaerat possimus dolore odit eligendi rerum quo recusandae porro excepturi ducimus aliquam maxime delectus corporis nemo, sunt ut neque consectetur. Quia harum porro voluptas placeat, tempore magnam error voluptatibus, reiciendis tempora ratione, iure esse quis!
      </router-link>
    </div>
    <div class="card__footer flex justify-end gap-10">
      <button 
        class="card__button w-full block bg-green-600 text-xl text-white rounded px-6 py-2" 
        type="button"
        @click="openVehicle(item.id)"
        >Buy <i class="fa fa-arrow-circle-right ml-5" aria-hidden="true"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();

interface IPropVehicle {
  id: number,
  name: string,
  model: string,
  year: number,
  color: string,
  price: number,
  latitude: number,
  longitude: number,
}

const props = defineProps({
  item: {
    type: Object as PropType<IPropVehicle>,
    required: true,
  },
});

const openVehicle = (vehicleId: number) => {
  router.push(`/vehicle/${vehicleId}`);
}

</script>