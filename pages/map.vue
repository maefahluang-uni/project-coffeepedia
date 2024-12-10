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
          <div class="mb-3 d-flex justify-center">
            <v-img
              class="rounded-xl"
              cover
              :src="imagelocation"
              max-height="275"
            />
          </div>
          <div class="d-flex flex-wrap justify-space-evenly">
            <v-card
              max-width="270"
              v-for="category in categories"
              :key="categories.ID"
              class="pa-3 ml-1 mb-1 border-md rounded-lg flex-fill"
              ><h3>{{ category.name }}</h3>
              <v-divider class="mt-3" :thickness="3" />
              <div v-for="score in scores" :key="scores.ID">
                <p v-if="category.ID == score.CategoryID" class="my-1">
                  <span class="font-weight-bold">{{ score.name }}</span>
                  <span v-if="category.ID == 2"
                    >&nbsp;{{ checkUnit(score.unit) }}</span
                  >
                  {{ checkValue(score.value) }}
                </p>
              </div>
            </v-card>
          </div>
          <!--<div class="d-flex flex-wrap justify-space-evenly">
            <div v-for="category in categories" :key="categories.ID">
              <v-card
                max-width="270"
                class="pa-3 ml-1 mb-1 border-md rounded-lg"
                ><h3>{{ category.name }}</h3>
                <v-divider class="mt-3" :thickness="3" />
                <div v-for="score in scores" :key="scores.ID">
                  <p v-if="category.ID == score.CategoryID" class="my-1">
                    <span class="font-weight-bold">{{ score.name }}</span>
                    <span v-if="category.ID == 2"
                      >&nbsp;{{ checkUnit(score.unit) }}</span
                    >
                    {{ checkValue(score.value) }}
                  </p>
                </div>
              </v-card>
            </div>
          </div>-->
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

const categories = ref([]);

const score_lists = ref([
  {
    ID: 1,
    CategoryID: 1,
    name: "Fragrance/Aroma",
    unit: "",
    IsActivate: "1",
  },
  {
    ID: 2,
    CategoryID: 1,
    name: "Flavor",
    unit: "",
    IsActivate: "1",
  },
  {
    ID: 3,
    CategoryID: 1,
    name: "Aftertaste",
    unit: "",
    IsActivate: "1",
  },
  {
    ID: 4,
    CategoryID: 2,
    name: "Protein",
    unit: "%",
    IsActivate: "1",
  },
  {
    ID: 5,
    CategoryID: 2,
    name: "Density",
    unit: "g/mL",
    IsActivate: "1",
  },
  {
    ID: 6,
    CategoryID: 2,
    name: "Moisture content",
    unit: "% d.b.",
    IsActivate: "1",
  },
]);

const scores = ref([]);
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

const getScores = async () => {
  try {
    const res = await axios.get(api + "api/scores/lists_map", {
      headers: apiHaders,
    });
    if (res.status == 200 && res.data.response != null) {
      scores.value = res.data.response;
    }
  } catch (err) {
    console.error("Error fetching category:", err);
  }
};
const getCategories = async () => {
  try {
    const res = await axios.get(api + "api/scores/categories_map", {
      headers: apiHaders,
    });
    if (res.status == 200 && res.data.response != null) {
      categories.value = res.data.response;
      getScores();
    }
  } catch (err) {
    console.error("Error fetching category:", err);
  }
};
const checkMASL = (masl) => {
  if (!masl || masl == "0" || masl == 0) {
    return "0";
  }
  return masl;
};
const checkUnit = (unit) => {
  if (unit == "-" || !unit) {
    return "";
  }
  return "(" + unit + ")";
};
const checkValue = (value) => {
  if (value == "-" || !value) {
    return "-";
  }
  return value;
};
onMounted(() => {
  getAllLocation();
  getCategories();
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
