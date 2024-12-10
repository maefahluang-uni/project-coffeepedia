<template>
  <div class="d-flex justify-center">
    <v-card class="my-10 card-table elevation-10"
      ><v-data-table :headers="header" :items="locations"
        ><template v-slot:top>
          <v-toolbar color="white"
            ><v-toolbar-title class="d-flex">
              <h4>Manage Location</h4>
            </v-toolbar-title>

            <v-btn
              class="d-none d-sm-flex mr-3"
              color="green"
              variant="tonal"
              rounded="xl"
              @click="addLocation()"
            >
              <v-icon icon="mdi-plus" color="green"></v-icon>
              Add Location
            </v-btn>
            <v-btn
              class="d-flex d-sm-none"
              color="green"
              variant="tonal"
              rounded="xl"
              @click="addLocation()"
            >
              <v-icon icon="mdi-plus" color="green"></v-icon>
            </v-btn>
            <v-dialog
              v-model="dialog"
              max-width="700px"
              @click:outside="close()"
              ><v-form
                ref="form"
                v-model="valid"
                lazy-validation
                @submit.prevent
              >
                <v-card>
                  <v-container>
                    <v-card-title>
                      <span class="text-h5">Location detail</span>
                    </v-card-title>
                    <v-card-text>
                      <div class="d-flex mb-2">
                        <v-text-field
                          class="pr-7"
                          v-model="editedItem.farmName"
                          label="Farm Name*"
                          :rules="farmNameRule"
                          required
                        ></v-text-field
                        ><v-text-field
                          v-model="editedItem.locationName"
                          label="Location Name*"
                          :rules="LocationNameRule"
                          required
                        ></v-text-field>
                      </div>

                      <div class="d-flex mb-2">
                        <v-text-field
                          class="pe-7"
                          v-model="editedItem.latitude"
                          label="Latitude*"
                          :rules="LatitudeRule"
                          required
                        ></v-text-field
                        ><v-text-field
                          class="pr-3"
                          v-model="editedItem.longtitude"
                          label="Longtitude*"
                          :rules="LongtitudeRule"
                          required
                        ></v-text-field>
                        <v-btn
                          color="error"
                          variant="tonal"
                          rounded="xl"
                          @click="showpinmap = !showpinmap"
                          icon="mdi-pin"
                        >
                        </v-btn>
                      </div>
                      <v-text-field
                        v-model="editedItem.masl"
                        label="MASL (Meter)"
                        type="number"
                      ></v-text-field>
                      <div class="d-flex mb-2">
                        <v-text-field
                          class="pr-7"
                          v-model="editedItem.zipcode"
                          label="Zipcode"
                          type="number"
                        ></v-text-field
                        ><v-autocomplete
                          v-model="selectedProvince"
                          :items="provinces"
                          label="Province*"
                          item-value="id"
                          item-title="name_en"
                          :rules="provinceRule"
                          required
                          clearable
                          ><template v-slot:item="{ props, item }">
                            <v-list-item
                              v-bind="props"
                              :title="item.raw.name_en"
                            ></v-list-item>
                          </template>
                        </v-autocomplete>
                      </div>
                      <div class="d-flex mb-2">
                        <v-autocomplete
                          class="mr-7"
                          v-model="selectedDistrict"
                          :items="districts"
                          label="District*"
                          item-value="id"
                          item-title="name_en"
                          :rules="districtRule"
                          required
                          clearable
                          ><template v-slot:item="{ props, item }">
                            <v-list-item
                              v-bind="props"
                              :title="item.raw.name_en"
                            ></v-list-item>
                          </template>
                        </v-autocomplete>
                        <v-autocomplete
                          v-model="selectedSubDistrict"
                          :items="subDistricts"
                          label="Sub-District*"
                          item-value="id"
                          item-title="name_en"
                          :rules="subdistrictRule"
                          required
                          clearable
                          ><template v-slot:item="{ props, item }">
                            <v-list-item
                              v-bind="props"
                              :title="item.raw.name_en"
                            ></v-list-item>
                          </template>
                        </v-autocomplete>
                      </div>
                      <v-file-input
                        v-model="inputImage"
                        accept="image/*"
                        label="New image"
                      ></v-file-input>
                      <div class="d-flex justify-center">
                        <img
                          v-if="editedItem.image"
                          class="mx-5"
                          :src="api + editedItem.image"
                          height="300"
                        />
                      </div>
                      <v-dialog v-model="showpinmap" max-width="700px">
                        <v-container>
                          <LMap
                            :zoom="zoom"
                            :center="[19.9059, 99.833]"
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
                        </v-container>
                      </v-dialog>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="gray" variant="tonal" @click="close()">
                        Cancel
                      </v-btn>
                      <v-btn
                        type="submit"
                        color="#6AC479"
                        variant="elevated"
                        class="font-weight-bold text-white"
                        @click="save()"
                      >
                        Save
                      </v-btn>
                    </v-card-actions></v-container
                  ></v-card
                ></v-form
              ></v-dialog
            >
          </v-toolbar> </template
        ><template v-slot:item="{ item, index }">
          <tr :class="index % 2 === 0 ? 'even-row' : 'odd-row'">
            <td>
              <p class="news-title">{{ item.farmName }}</p>
            </td>
            <td>
              <div class="d-flex align-center justify-center">
                <img
                  v-if="item.image"
                  height="100"
                  aspect-ratio="1/1"
                  :src="api + item.image"
                />
                <img
                  v-else
                  height="100"
                  src="https://static.vecteezy.com/system/resources/previews/004/141/669/large_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"
                />
              </div>
            </td>
            <td>
              <p class="news-title">{{ item.locationName }}</p>
            </td>
            <td>
              <p class="news-title">
                {{ item.subdistrict }}, {{ item.district }},
                {{ item.province }}, {{ item.zipcode }}
              </p>
            </td>
            <td>
              <div class="d-flex justify-end align-center">
                <v-icon size="small" @click="editItem(item, index)">
                  mdi-pencil
                </v-icon>
              </div>
            </td>
            <td>
              <div class="d-flex justify-start align-center">
                <v-progress-circular
                  v-if="item.iconLoading"
                  size="small"
                  :width="3"
                  indeterminate
                ></v-progress-circular>
                <v-switch
                  v-else
                  v-model="item.IsActivate"
                  false-value="0"
                  true-value="1"
                  color="success"
                  hide-details
                  class="d-inline-block"
                  @click="toggleLocation(item, index)"
                ></v-switch>
              </div>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script setup>
import { ref, onMounted, watch, computed } from "vue";
import axios from "axios";
import config from "../config.js";
const api = config.LOCAL_API_URL;
const apiKey = config.API_KEY;
const apiHaders = { "ngrok-skip-browser-warning": "true", "api-key": apiKey };

const dialog = ref(false);
const showpinmap = ref(false);
const zoom = ref(10);
const inputImage = ref(null);
const selectedCoordinates = ref({ lat: 0, lng: 0 });

const form = ref(null);
const valid = ref(false);

const selectedProvince = ref(null);
const selectedDistrict = ref(null);
const selectedSubDistrict = ref(null);

const provincesCache = ref([]);
const districtsCache = ref([]);
const subDistrictsCache = ref([]);

const provinceCache = ref(null);
const districtCache = ref(null);
const subDistrictCache = ref(null);

const provinces = ref([]);
const districts = ref([]);
const subDistricts = ref([]);

const editedIndex = ref(-1);
const editedItem = ref({
  id: "",
  farmName: "",
  locationName: "",
  latitude: "",
  longtitude: "",
  masl: "",
  province: "",
  district: "",
  subdistrict: "",
  zipcode: "",
  image: "",
  IsActivate: "1",
});
const defaultItem = ref({
  id: "",
  farmName: "",
  locationName: "",
  latitude: "",
  longtitude: "",
  masl: "",
  province: "",
  district: "",
  subdistrict: "",
  zipcode: "",
  image: "",
  IsActivate: "1",
});
const header = ref([
  { title: "Farm Name", align: "start", key: "farmName" },
  { title: "Image", align: "start", key: "image", sortable: false },
  {
    title: "Location",
    key: "locationName",
  },
  {
    title: "Address",
    key: "address",
  },
  { title: "Edit", align: "end", key: "actions", sortable: false },
  {
    title: "Status",
    align: "start",
    key: "actions2",
    sortable: false,
  },
]);

const locations = ref([]);
const farmNameRule = [(v) => !!v || "Farm Name is required"];
const LocationNameRule = [(v) => !!v || "Location Name is required"];
const LatitudeRule = [
  (v) => !!v || "Latitude is required",
  (v) =>
    /^[+-]?\d+(\.\d+)?$/.test(v) || "Must be a valid floating-point number",
];
const LongtitudeRule = [
  (v) => !!v || "Longtitude is required",
  (v) =>
    /^[+-]?\d+(\.\d+)?$/.test(v) || "Must be a valid floating-point number",
];
const provinceRule = [(v) => !!v || "Province is required"];
const districtRule = [(v) => !!v || "District is required"];
const subdistrictRule = [(v) => !!v || "Sub District is required"];
// Function to handle clicking on the map
const onMapClick = (event) => {
  const { lat, lng } = event.latlng;
  selectedCoordinates.value = { lat, lng }; // Update the coordinates when the user clicks the map
  editedItem.value.latitude = selectedCoordinates.value.lat;
  editedItem.value.longtitude = selectedCoordinates.value.lng;
  showpinmap.value = !showpinmap.value;
};

const addLocation = () => {
  selectedCoordinates.value.lat = 19.9059;
  selectedCoordinates.value.lng = 99.833;
  dialog.value = !dialog.value;
  editedIndex.value = -1;
  editedItem.value = Object.assign({}, defaultItem);
};

const editItem = (item, index) => {
  selectedCoordinates.value.lat = item.latitude;
  selectedCoordinates.value.lng = item.longtitude;
  editedIndex.value = index;
  selectedProvince.value = item.province;
  selectedDistrict.value = item.district;
  selectedSubDistrict.value = item.subdistrict;
  editedItem.value = Object.assign({}, item);
  dialog.value = true;
};

const close = () => {
  dialog.value = false;
  selectedProvince.value = null;
  selectedDistrict.value = null;
  selectedSubDistrict.value = null;
  inputImage.value = null;
  selectedCoordinates.value.lat = 19.9059;
  selectedCoordinates.value.lng = 99.833;
  editedItem.value = Object.assign({}, defaultItem.value);
  editedIndex.value = -1;
};

const save = async () => {
  if (valid.value) {
    if (editedIndex.value > -1) {
      let imageUrl = editedItem.value.image;
      if (inputImage.value) {
        try {
          const formData = new FormData();
          formData.append(
            "image",
            inputImage.value[0],
            Date.now() + "_" + inputImage.value[0].name
          );
          const res = await axios.post(api + "api/images/upload", formData, {
            headers: {
              "ngrok-skip-browser-warning": "true",
              "api-key": apiKey,
              "Content-Type": "multipart/form-data", // Set correct content type for file upload
            },
          });
          if (res.request.status == 200) {
            imageUrl = res.data.imageUrl;
          }
        } catch (err) {
          console.error("Error upload image:", err);
        }
      }
      const sentItem = {
        id: editedItem.value.id,
        farmName: editedItem.value.farmName,
        locationName: editedItem.value.locationName,
        latitude: editedItem.value.latitude,
        longtitude: editedItem.value.longtitude,
        masl: editedItem.value.masl,
        province: editedItem.value.province,
        district: editedItem.value.district,
        subdistrict: editedItem.value.subdistrict,
        zipcode: editedItem.value.zipcode,
        image: imageUrl,
      };

      try {
        const res = await axios.post(
          api + "api/location/post_request?edit=true",
          sentItem,
          {
            headers: apiHaders,
          }
        );
        console.log(res.data.status);
        if (res.data.status == 200) {
          Object.assign(locations.value[editedIndex.value], sentItem);
          close();
        }
      } catch (err) {
        console.error("Error update location:", err);
      }
    } else {
      let imageUrl = editedItem.value.image;
      if (inputImage.value) {
        try {
          const formData = new FormData();
          formData.append(
            "image",
            inputImage.value[0],
            Date.now() + "_" + inputImage.value[0].name
          );
          const res = await axios.post(api + "api/images/upload", formData, {
            headers: {
              "ngrok-skip-browser-warning": "true",
              "api-key": apiKey,
              "Content-Type": "multipart/form-data", // Set correct content type for file upload
            },
          });
          if (res.request.status == 200) {
            imageUrl = res.data.imageUrl;
          }
        } catch (err) {
          console.error("Error upload image:", err);
        }
      }
      const sentItem = {
        farmName: editedItem.value.farmName,
        locationName: editedItem.value.locationName,
        latitude: editedItem.value.latitude,
        longtitude: editedItem.value.longtitude,
        masl: editedItem.value.masl,
        province: provinceCache.value.name_en,
        district: districtCache.value.name_en,
        subdistrict: subDistrictCache.value.name_en,
        zipcode: editedItem.value.zipcode,
        image: imageUrl,
      };
      try {
        const res = await axios.post(
          api + "api/location/post_request?insert=true",
          sentItem,
          {
            headers: apiHaders,
          }
        );
        if (res.data.status == 200) {
          Object.assign(sentItem, { IsActivate: "1" });
          locations.value.push(sentItem);
          close();
        }
      } catch (err) {
        console.error("Error insert location:", err);
      }
    }
  }
};
const toggleLocation = async (item, index) => {
  let eyeIcon = "mdi-eye";
  let isactivateNumChange =
    locations.value[index].IsActivate === "1" ? "0" : "1";
  locations.value[index].iconLoading = true;
  console.log(item);
  let loca = {
    id: item.id,
    IsActivate: isactivateNumChange,
  };
  try {
    const res = await axios.post(
      api + "api/location/post_request?edit=true",
      loca,
      {
        headers: apiHaders,
      }
    );
    if (res.data.status == 200) {
      locations.value[index].IsActivate = isactivateNumChange;
      if (isactivateNumChange == 0) {
        eyeIcon = "mdi-eye-off";
      }
      locations.value[index].eyeIcon = eyeIcon;
      locations.value[index].iconLoading = false;
    }
  } catch (err) {
    console.error("Error changeLocationActivate:", error);
  }
};

const getAllLocation = async () => {
  try {
    const res = await axios.get(api + "api/location?admin=true", {
      headers: apiHaders,
    });
    res.data.response.forEach((element) => {
      let eyeIcon = "mdi-eye";
      if (element.IsActivate == 0) {
        eyeIcon = "mdi-eye-off";
      }
      Object.assign(element, { iconLoading: false });
      Object.assign(element, { eyeIcon });
    });
    locations.value = res.data.response;
  } catch (err) {
    console.error("Error fetching all locations:", err);
  }
};
onMounted(async () => {
  getAllLocation();
  const provinceData = await axios.get(
    "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province.json"
  );
  provinces.value = provinceData.data;
  provincesCache.value = provinceData.data;
});
watch(selectedProvince, async (newValue) => {
  provinceCache.value = provincesCache.value.filter(
    (d) => Number(d.id) === newValue
  )[0];
  const districtData = await axios.get(
    "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_amphure.json"
  );
  districts.value = districtData.data.filter(
    (d) => d.province_id === selectedProvince.value
  );
  districtCache.value = districtData.data;
  districtsCache.value = districtData.data;
});
watch(selectedDistrict, async (newValue) => {
  districtCache.value = districtsCache.value.filter(
    (d) => Number(d.id) === newValue
  )[0];
  const subdistrictData = await axios.get(
    "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_tambon.json"
  );
  subDistricts.value = subdistrictData.data.filter(
    (s) => s.amphure_id === selectedDistrict.value
  );
  subDistrictCache.value = subdistrictData.data;
  subDistrictsCache.value = subdistrictData.data;
});

watch(selectedSubDistrict, async (newValue) => {
  subDistrictCache.value = subDistrictsCache.value.filter(
    (d) => Number(d.id) === newValue
  )[0];
});
</script>
