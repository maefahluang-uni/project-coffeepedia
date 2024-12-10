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
        <v-card
          width="600"
          class="ml-n6 mt-n4 mb-n4 pa-3 rounded-lg elevation-5 mapcard"
        >
          <h2 class="text-center pb-2">
            {{ marker.farmName }} ({{ marker.locationName }})
          </h2>
          <p class="my-0 pb-2 text-center">
            {{ marker.subdistrict }}, {{ marker.district }},
            {{ marker.province }}, {{ marker.zipcode }}
          </p>
          <p class="my-0 pb-2 text-center">
            Latitude: {{ marker.latitude.toFixed(2) }}, Longitude:
            {{ marker.longtitude.toFixed(2) }}, MASL:
            {{ checkMASL(marker.masl) }} m.
          </p>
          <div class="pb-3 d-flex justify-center">
            <v-img
              class="rounded-xl"
              cover
              :src="imagelocation"
              max-height="300"
            />
          </div>
          <v-row class="justify-space-evenly px-5 my-2">
            <v-card
              max-width="270"
              v-for="category in categories"
              :key="categories.ID"
              class="pa-3 border-md rounded-lg"
              ><h3>{{ category.name }}</h3>
              <v-divider class="mt-3" :thickness="3" />
              <div v-for="score in score_value">
                <p
                  v-if="
                    category.ID == score.catagoryID &&
                    score.locationID == marker.id
                  "
                >
                  {{ score.name }}
                  <span v-if="category.ID == 2">({{ score.unit }})</span>:
                  {{ score.value }}
                </p>
              </div>
            </v-card>
          </v-row>
        </v-card>
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

const categories = ref([
  {
    ID: 1,
    name: "Cupping Scores",
    IsActivate: "1",
  },
  {
    ID: 2,
    name: "Physical and Chemical Properties",
    IsActivate: "1",
  },
]);

const score_lists = ref([
  {
    ID: 1,
    catagoryID: 1,
    name: "Fragrance/Aroma",
    unit: "",
    IsActivate: "1",
  },
  {
    ID: 2,
    catagoryID: 1,
    name: "Flavor",
    unit: "",
    IsActivate: "1",
  },
  {
    ID: 3,
    catagoryID: 1,
    name: "Aftertaste",
    unit: "",
    IsActivate: "1",
  },
  {
    ID: 4,
    catagoryID: 2,
    name: "Protein",
    unit: "%",
    IsActivate: "1",
  },
  {
    ID: 5,
    catagoryID: 2,
    name: "Density",
    unit: "g/mL",
    IsActivate: "1",
  },
  {
    ID: 6,
    catagoryID: 2,
    name: "Moisture content",
    unit: "% d.b.",
    IsActivate: "1",
  },
]);

const score_value = ref([
  {
    ID: 1,
    locationID: 2,
    catagoryID: 1,
    scoreID: 1,
    name: "Fragrance/Aroma",
    unit: "",
    value: "-",
  },
  {
    ID: 2,
    locationID: 2,
    catagoryID: 1,
    scoreID: 2,
    name: "Flavor",
    unit: "",
    value: "-",
  },
  {
    ID: 3,
    locationID: 2,
    catagoryID: 1,
    scoreID: 3,
    name: "Aftertaste",
    unit: "",
    value: "-",
  },
  {
    ID: 4,
    locationID: 2,
    catagoryID: 2,
    scoreID: 4,
    name: "Protein",
    unit: "%",
    value: "13.02",
  },
  {
    ID: 5,
    locationID: 2,
    catagoryID: 2,
    scoreID: 5,
    name: "Density",
    unit: "g/mL",
    value: "1.14",
  },
  {
    ID: 6,
    locationID: 2,
    catagoryID: 2,
    scoreID: 6,
    name: "Moisture content",
    unit: "% d.b.",
    value: "11.58",
  },
  {
    ID: 7,
    locationID: 4,
    catagoryID: 1,
    scoreID: 1,
    name: "Fragrance/Aroma",
    unit: "",
    value: "-",
  },
  {
    ID: 8,
    locationID: 4,
    catagoryID: 1,
    scoreID: 2,
    name: "Flavor",
    unit: "",
    value: "Light-bodied and somewhat sour, grassy",
  },
  {
    ID: 9,
    locationID: 4,
    catagoryID: 1,
    scoreID: 3,
    name: "Aftertaste",
    unit: "",
    value: "-",
  },
  {
    ID: 10,
    locationID: 4,
    catagoryID: 2,
    scoreID: 4,
    name: "Protein",
    unit: "%",
    value: "13.23",
  },
  {
    ID: 11,
    locationID: 4,
    catagoryID: 2,
    scoreID: 5,
    name: "Density",
    unit: "g/mL",
    value: "1.15",
  },
  {
    ID: 12,
    locationID: 4,
    catagoryID: 2,
    scoreID: 6,
    name: "Moisture content",
    unit: "% d.b.",
    value: "8.18",
  },
]);

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

const checkMASL = (masl) => {
  if (!masl || masl == "0" || masl == 0) {
    return "0";
  }
  return masl;
};
onMounted(() => {
  getAllLocation();
});
</script>

<style>
/* Custom styles for the popup */
.leaflet-container a.leaflet-popup-close-button {
  display: none !important;
}
.leaflet-popup-content-wrapper,
.leaflet-popup-tip {
  box-shadow: none !important;
}
.mapcard p {
  font-size: 14px;
}
</style>
