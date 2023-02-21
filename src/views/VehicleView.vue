<template>
  <main class="vehicle py-6">
    <div class="vehicle__header">
      <h1 class="vehicle__title text-5xl mb-5">
        {{ vehiclesStore.currentVehicle.name }}
        {{ vehiclesStore.currentVehicle.model }}
      </h1>
      <div class="mb-5">
        <span class="text-base bg-blue-500 text-white rounded-full px-4 py-3">{{ vehiclesStore.currentVehicle.latitude }}</span><span class="text-base bg-blue-500 text-white rounded-full px-4 py-3 ml-5">{{ vehiclesStore.currentVehicle.longitude }}</span>
      </div>
      <p class="vehicle__info text-lg mb-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
        excepturi nisi doloremque animi eius assumenda doloribus laudantium!
        Laboriosam, itaque corporis.
      </p>
    </div>
    <div class="vehicle__body relative">
      <picture class="vehicle__picture block relative aspect-[4/3] mb-5">
        <img
          class="vehicle__image absolute left-0 top-0 w-full h-full object-cover"
          src="https://glonassgps.biz/wp-content/uploads/2022/12/commercheskiy_transport.png"
          alt="vehicle"
        />
      </picture>
      <p class="vehicle__description text-lg mb-5">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error sint
        repellat nam saepe quidem cum similique molestias officia veniam magni.
        Magnam libero qui a! Praesentium, sunt repellat hic laborum ullam
        repellendus tempore odit? Soluta numquam tenetur neque odio earum saepe
        aut quis dolor illo. Exercitationem odio ratione voluptatum possimus
        excepturi praesentium ex, voluptatem asperiores id distinctio,
        perferendis tempore quo soluta totam pariatur? Aut amet quos quaerat
        possimus dolore odit eligendi rerum quo recusandae porro excepturi
        ducimus aliquam maxime delectus corporis nemo, sunt ut neque
        consectetur. Quia harum porro voluptas placeat, tempore magnam error
        voluptatibus, reiciendis tempora ratione, iure esse quis!
      </p>
    </div>
    <div class="vehicle__footer flex justify-end gap-10">
      <button
        class="vehicle__button block bg-yellow-500 text-white rounded px-6 py-2"
        type="button"
        @click="showEditForm"
      >
        Edit <i class="fa fa-pencil ml-5" aria-hidden="true"></i>
      </button>
      <button
        class="vehicle__button block bg-red-600 text-white rounded px-6 py-2"
        type="button"
        @click="deleteVehicle"
      >
        Delete <i class="fa fa-trash ml-5" aria-hidden="true"></i>
      </button>
    </div>
    <form
      v-if="isShowEditForm"
      class="flex flex-col shadow-lg p-5 rounded-md mt-5"
      action="#"
      method="POST"
      @submit.prevent="editVehicle"
    >
      <div class="mb-5">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
          Username
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          v-model="vehicle.name"
          placeholder="Enter vehicle name"
          required
        />
      </div>

      <div class="mb-5">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="model">
          Model
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="model"
          type="text"
          v-model="vehicle.model"
          placeholder="Enter vehicle model"
          required
        />
      </div>

      <div class="mb-5">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="year">
          Year
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="year"
          type="number"
          v-model.number="vehicle.year"
          placeholder="Enter vehicle year"
          required
        />
      </div>

      <div class="mb-5">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="color">
          Color
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="color"
          type="text"
          v-model="vehicle.color"
          placeholder="Enter vehicle color"
          required
        />
      </div>

      <div class="mb-5">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="price">
          Price
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="price"
          type="number"
          v-model.number="vehicle.price"
          placeholder="Enter vehicle price"
          required
        />
      </div>

      <div class="mb-5">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="latitude">
          Latitude
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="latitude"
          type="number"
          v-model.number="vehicle.latitude"
          placeholder="Enter vehicle latitude"
          required
        />
      </div>

      <div class="mb-5">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="longitude">
          Longitude
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="longitude"
          type="number"
          v-model.number="vehicle.longitude"
          placeholder="Enter vehicle longitude"
          required
        />
      </div>

      <button
        class="vehicle__form-button block bg-green-600 text-white rounded px-6 py-2"
        type="submit"
        @click="editVehicle"
      >
        Save <i class="fa fa-pencil ml-5" aria-hidden="true"></i>
      </button>
    </form>
  </main>
</template>

<script setup lang="ts">
import AppCard from "@/components/AppCard.vue";
import { useVehiclesStore } from "@/stores/vehicles";
import { reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

interface IVehicle {
  id: number;
  name: string;
  model: string;
  year: number;
  color: string;
  price: number;
  latitude: number;
  longitude: number;
}

const route = useRoute();
const router = useRouter();

const isShowEditForm = ref(false);
const vehicle = reactive<IVehicle>({
  id: null,
  name: "",
  model: "",
  year: null,
  color: "",
  price: null,
  latitude: null,
  longitude: null,
});

const vehiclesStore = useVehiclesStore();

vehiclesStore.fetchCurrentVehicle(route.params.id);

const showEditForm = () => {
  isShowEditForm.value = !isShowEditForm.value;
};

const editVehicle = () => {
  vehicle.id = route.params.id;
  vehiclesStore.changeCurrentVehicle(vehicle);
};

const deleteVehicle = () => {
  vehiclesStore.deleteCurrentVehicle(route.params.id);
  router.push("/");
};
</script>
