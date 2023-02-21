import { defineStore } from 'pinia';
import axios from 'axios';

export interface IVehicle {
  id: number,
  name: string,
  model: string,
  year: number,
  color: string,
  price: number,
  latitude: number,
  longitude: number,
}

export const useVehiclesStore = defineStore({
  id: 'vehicles',
  state: () => (
    {
      vehicles: [] as IVehicle[],
      currentVehicle: {} as IVehicle,
    }
  ),
  actions: {
    async fetchVehicles() {
      try {
        const response = await axios.get('https://test.tspb.su/test-task/vehicles');
        const data = await response.data;
        this.vehicles = data;
        console.log('data: ', data);
      } catch (error) {
        console.log('error: ', error);
      }
    },
    async fetchCurrentVehicle(id: number) {
      try {
        const response = await axios.get(`https://test.tspb.su/test-task/vehicles/${id}`);
        const data = await response.data;
        this.currentVehicle = data;
      } catch (error) {
        console.log('error: ', error);
      }
    },
    async changeCurrentVehicle(payload: IVehicle) {
      try {
        let formData = new FormData();
        formData = payload;
        const response = await axios.put(`https://test.tspb.su/test-task/vehicles/${payload.id}`, formData);
        const data = await response.data;
        console.log('data: ', data);
      } catch (error) {
        console.log('error: ', error);
      }
    },
    async deleteCurrentVehicle(id: number) {
      try {
        const response = await axios.delete(`https://test.tspb.su/test-task/vehicles/${id}`);
        const data = await response.data;
        console.log('data: ', data);
      } catch (error) {
        console.log('error: ', error);
      }
    },
  },
  getters: {
    itemsCount() {
      return this.vehicles.length;
    }
  },
});
