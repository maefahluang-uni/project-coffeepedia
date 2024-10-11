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
      :lat-lng="[marker.latitude, marker.longtitude]"
      @click="selectMarker(marker)"
    >
      <LPopup>
        <div class="d-flex justify-center pb-3">
          <v-img contain :src="imagelocation" />
        </div>

        <div>
          <h3 class="pb-2">
            {{ marker.farmName }} ({{ marker.locationName }})
          </h3>
          <p class="my-0">
            Latitude: {{ marker.latitude }}<br />
            Longtitude: {{ marker.longtitude }} <br />
            MASL: {{ marker.masl }} m.<br />
            {{ marker.subdistrict }}, {{ marker.district }},
            {{ marker.province }}, {{ marker.zipcode }}
          </p>
        </div>
      </LPopup>
    </LMarker>
  </LMap>
</template>

<script setup>
import { ref } from "vue";
import { onMounted } from "vue";
import axios from "axios";
import config from "../config.js";
const api = config.LOCAL_API_URL;
const apiKey = config.API_KEY;
const apiHaders = { "ngrok-skip-browser-warning": "true", "api-key": apiKey };
const zoom = ref(10);
const imagelocation = ref(null);

const markers = ref([]);

// State for the dialog and selected marker
const dialog = ref(false);
const selectedMarker = ref({});

// Function to handle marker selection
const selectMarker = (marker) => {
  imagelocation.value =
    "https://static.vecteezy.com/system/resources/previews/004/141/669/large_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";
  getImageUrl(marker.image);
  selectedMarker.value = marker;
  dialog.value = true; // Open the dialog
};
const getAllLocation = async () => {
  try {
    const Response = await axios.get(api + "api/location", {
      headers: apiHaders,
    });

    if (Response.status == 200 && Response.data.response != null) {
      markers.value = Response.data.response;
    }
  } catch (err) {
    console.error("Error fetching location:", err);
  }
};
const getImageUrl = async (uri) => {
  if (!uri) return;
  imagelocation.value = config.LOCAL_API_URL + uri;
};
onMounted(() => {
  getAllLocation();
});
</script>

<style scoped>
/* Custom styles for the popup */
</style>
