<template>
  <YandexMap :settings="settings" :coordinates="[59.897190, 30.282855]" :zoom="16" :controls="[]"
    style="width: 100%; height: 100%;">
    <YandexMarker :coordinates="[59.897190, 30.282855]" marker-id="123" hint-content="Мы находимся здесь" />
  </YandexMap>
</template>

<script setup lang="ts">
import { YandexMap, YandexMarker } from 'vue-yandex-maps';

interface Settings {
  apiKey: string;
  lang: string;
  coordorder: 'latlong';
  enterprise: boolean;
  version: '2.1';
}

const settings: Settings = {
  apiKey: 'c4f7ecd8-b2a3-483b-9b5e-ee3e18ee1b0c',
  lang: 'ru_RU',
  coordorder: 'latlong',
  enterprise: false,
  version: '2.1',
};
</script>

<style>
.yandex-container {
  border-radius: 16px;
  overflow: hidden;
}

[class*="copyrights-pane"] {
  display: none !important;
}
</style>
