<template>
  <v-container>
    <v-card class="pa-5">
      <v-text-field label="Name*" v-model="name" />
      <v-text-field label="zipcode*" v-model="zipcode" />
      <!-- Province Select -->
      <v-autocomplete
        v-model="selectedProvince"
        :items="provinces"
        label="Province*"
        item-value="id"
        item-title="name_en"
        clearable
        ><template v-slot:item="{ props, item }">
          <v-list-item v-bind="props" :title="item.raw.name_en"></v-list-item>
        </template>
      </v-autocomplete>

      <!-- District Select -->
      <v-autocomplete
        v-model="selectedDistrict"
        :items="districts"
        label="District*"
        item-value="id"
        item-title="name_en"
        clearable
        ><template v-slot:item="{ props, item }">
          <v-list-item v-bind="props" :title="item.raw.name_en"></v-list-item>
        </template>
      </v-autocomplete>

      <!-- Subdistrict Select -->
      <v-autocomplete
        v-model="selectedSubDistrict"
        :items="subDistricts"
        label="Sub-District*"
        item-value="id"
        item-title="name_en"
        clearable
        ><template v-slot:item="{ props, item }">
          <v-list-item v-bind="props" :title="item.raw.name_en"></v-list-item>
        </template>
      </v-autocomplete>

      <v-btn @click="submitForm" color="success">Submit</v-btn>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";

// Form state
const name = ref("");
const zipcode = ref("");
const selectedProvince = ref(null);
const selectedDistrict = ref(null);
const selectedSubDistrict = ref(null);

// Local cache
const provincesCache = ref([]);
const districtsCache = ref([]);
const subDistrictsCache = ref([]);

const provinceCache = ref(null);
const districtCache = ref(null);
const subDistrictCache = ref(null);

// Data storage (only loaded once)
const provinces = ref([]);
const districts = ref([]);
const subDistricts = ref([]);

// Fetch Provinces (only once)
onMounted(async () => {
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
  console.log(provinceCache.value);
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
  console.log(districtCache.value);
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

// Submit Form
const submitForm = () => {
  if (
    !name.value ||
    !selectedProvince.value ||
    !selectedDistrict.value ||
    !selectedSubDistrict.value
  ) {
    alert("Please complete all fields");
    return;
  }
  alert(`Submitted:
    Name: ${name.value}
    Province: ${provinceCache.value.name_en}
    District: ${districtCache.value.name_en}
    Subdistrict: ${subDistrictCache.value.name_en}`);
};
</script>
