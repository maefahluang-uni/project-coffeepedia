<template>
  <v-container>
    <LMap
      :zoom="zoom"
      :center="[18.7883, 98.9866]"
      @click="onMapClick"
      style="height: 400px; width: 100%"
      :use-global-leaflet="false"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        layer-type="base"
        name="OpenStreetMap"
      />
      <!-- Marker shows the selected point -->
      <LMarker :lat-lng="selectedCoordinates" />
    </LMap>

    <v-text-field v-model="selectedCoordinates.lat" label="Latitude" readonly />

    <v-text-field
      v-model="selectedCoordinates.lng"
      label="Longitude"
      readonly
    />
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const zoom = ref(6);

// Initial coordinates set to Chiang Mai as an example
const selectedCoordinates = ref({ lat: 18.7883, lng: 98.9866 });

// Function to handle clicking on the map
const onMapClick = (event) => {
  const { lat, lng } = event.latlng;
  selectedCoordinates.value = { lat, lng }; // Update the coordinates when the user clicks the map
};
</script>

<style scoped>
/* Add any custom styling you need */
</style>
