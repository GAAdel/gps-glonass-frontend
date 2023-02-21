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

export interface IfilterValues {
  minPrice: number,
  maxPrice: number,
}

export const useVehiclesStore = defineStore({
  id: 'vehicles',
  state: () => (
    {
      vehicles: [] as IVehicle[],
      currentVehicle: {} as IVehicle,
      vehicleYears: [] as number[],
      minPrice: null,
      maxPrice: null,
      chosenYear: null,
    }
  ),
  actions: {
    async fetchVehicles() {
      try {
        const response = await axios.get('https://test.tspb.su/test-task/vehicles');
        const data = await response.data;
        this.vehicles = data;
        console.log('fetchVehicles: ', data);
        this.setVehicleYears();
        this.setMinMaxPrice();
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
    async filterVehicles(filterValues: IfilterValues) {
      const response = await this.fetchVehicles();

      let minFilterPrice;
      if (filterValues.minPrice === '' || filterValues.minPrice == null) {
        minFilterPrice = 1;
      } else {
        minFilterPrice = filterValues.minPrice;
      }

      let maxFilterPrice;
      if (filterValues.maxPrice === '' || filterValues.maxPrice == null) {
        maxFilterPrice = this.maxPrice;
      } else {
        maxFilterPrice = filterValues.maxPrice;
      }

      console.log('minFilterPrice: ', minFilterPrice);
      console.log('maxFilterPrice: ', maxFilterPrice);
      let filteredVihicles = Object.values(this.vehicles).filter((item) => item.price >= minFilterPrice && item.price <= maxFilterPrice);
      if (this.chosenYear != null) {
        filteredVihicles = filteredVihicles.filter((item) => item.year == this.chosenYear);
      }
      
      console.log('filteredVihicles: ', filteredVihicles);
      this.vehicles = filteredVihicles;
    },
    async filterByYear (year: number) {
      const response = await this.fetchVehicles();
      const filteredByYear = Object.values(this.vehicles).filter((item) => item.year == year);
      this.vehicles = filteredByYear;
    },
    setVehicleYears() {
      const uniqueVehicleYears = Object.values(this.vehicles).map((item) => item.year).filter((x, i, a) => a.indexOf(x) === i);
      this.vehicleYears = uniqueVehicleYears;
    },
    setMinMaxPrice() {
      this.minPrice = Math.min(...Object.values(this.vehicles).map((item) => item.price));
      this.maxPrice = Math.max(...Object.values(this.vehicles).map((item) => item.price));
    },
    setChosenYear(year: number) {
      this.chosenYear = year;
    },
  },
  getters: {
    getVehicleYears() {
      return this.vehicleYears;
    },
    getMinPrice() {
      return this.minPrice;
    },    
    getMaxPrice() {
      return this.maxPrice;
    }
  },
});
