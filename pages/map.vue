<template>
  <LMap :zoom="zoom" :center="[19.912, 99.826]" :use-global-leaflet="false">
    <LTileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      layer-type="base"
      name="OpenStreetMap"
    />
    <!-- Example Markers -->
    <LMarker
      v-for="(marker, index) in markers"
      :key="index"
      :lat-lng="marker.latLng"
      @click="selectMarker(marker)"
    >
      <LPopup>
        <div class="d-flex justify-center pb-3">
          <img
            height="200"
            contain
            src="https://static.vecteezy.com/system/resources/previews/004/141/669/large_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
          />
        </div>

        <div>
          <h3>{{ marker.farmname }} ({{ marker.locationName }})</h3>
          <p class="my-0">
            Coordinates: {{ marker.latLng[0] }}, {{ marker.latLng[1] }} <br />
            {{ marker.address }}
          </p>
        </div>
      </LPopup>
    </LMarker>
  </LMap>
</template>

<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
const zoom = ref(10);

const markers = ref([
  {
    farmname: "Chiang Rai Clock Tower",
    locationName: "Doi Chang",
    latLng: [19.912, 99.826],
    address: "Thasud, Muang Chiang Rai, Chiang Rai, 57100",
    image: "",
  },
  {
    farmname: "Wat Rong Khun",
    locationName: "Doi Chang",
    latLng: [19.826, 99.74],
    address: " Thasud, Muang Chiang Rai, Chiang Rai, 57100",
    image: "",
  },
  {
    farmname: "Baan Dam Museum",
    locationName: "Doi Chang",
    latLng: [19.969, 99.759],
    masl: "",
    address: " Thasud, Muang Chiang Rai, Chiang Rai, 57100",
    image: "",
  },
]);

// State for the dialog and selected marker
const dialog = ref(false);
const selectedMarker = ref({});

// Function to handle marker selection
const selectMarker = (marker) => {
  selectedMarker.value = marker;
  dialog.value = true; // Open the dialog
};

onMounted(() => {});
</script>

<style scoped>
/* Custom styles for the popup */
</style>
