<template>
  <div class="justify-center d-flex mt-5 mb-5">
    <v-btn-toggle v-model="select" class="" mandatory>
      <v-btn
        color="rgb(140, 115, 70)"
        value=""
        class="ml-3 mr-3 my-2"
        rounded="xl"
        text="All"
      >
      </v-btn>
      <v-btn
        color="rgb(140, 115, 70)"
        value="wet"
        class="ml-3 mr-3 my-2"
        rounded="xl"
        text="Wet process"
      >
      </v-btn>
      <v-btn
        color="rgb(140, 115, 70)"
        value="dry"
        class="ml-3 mr-3 my-2"
        rounded="xl"
        text="Dry process"
      >
      </v-btn>
      <v-btn
        color="rgb(140, 115, 70)"
        value="honey"
        class="ml-3 mr-3"
        rounded="xl"
        text="Honey process"
      >
      </v-btn>
    </v-btn-toggle>
  </div>
  <v-card>
    <v-data-iterator
      :items="types"
      :items-per-page="itemsPerPage"
      :search="search"
    >
      <template v-slot:header>
        <v-toolbar class="px-10 d-flex mt-5" color="white">
          <p class="flex-grow-1">Showing All {{ types.length }} Results</p>
          <v-text-field
            v-model="search"
            density="comfortable"
            hide-details
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            style="max-width: 300px"
            variant="solo"
          ></v-text-field>
          <!--<div class="d-flex align-center">
            <v-btn class="me-8" variant="text" @click="onClickSeeAll">
              <span class="text-decoration-underline text-none">See all</span>
            </v-btn>

            <div class="d-inline-flex">
              <v-btn
                :disabled="page === 1"
                icon="mdi-arrow-left"
                size="small"
                variant="tonal"
                class="me-2"
                @click="prevPage"
              ></v-btn>

              <v-btn
                :disabled="page === pageCount"
                icon="mdi-arrow-right"
                size="small"
                variant="tonal"
                @click="nextPage"
              ></v-btn>
            </div>
          </div>-->
        </v-toolbar>
      </template>
      <template v-slot:default="{ items }">
        <!--<div v-for="(item, index) in items" :key="index" class="d-flex">
          <v-card>
            {{ item.raw.RoastName }} roasted {{ item.raw.ProcessName }} process
          </v-card>
        </div>-->

        <v-row class="my-2">
          <v-col
            v-for="(item, index) in items"
            :key="index"
            class="d-flex justify-center"
            cols="12"
            sm="4"
          >
            <v-card variant="outlined" rounded="xl" color="rgba(185, 160, 130)">
              <div class="cardbgcolor text-center pb-2">
                <v-img
                  :src="getImageUrl(item.raw.ImageDataFront.data)"
                  width="200"
                />
                <div>
                  <v-card-title class="font-weight-bold text-brown">
                    {{ item.raw.RoastName + " roasted" }}
                  </v-card-title>
                  <v-card-subtitle class="text-brown">
                    {{ item.raw.ProcessName + " process" }}
                  </v-card-subtitle>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-card>
</template>

<script>
import axios from "axios";
const api = "http://localhost:5000/api";

export default {
  data: () => ({
    itemsPerPage: 3,
    loading: true,
    select: "",
    search: "",
    value: 0,
    imageData: "",
    frontImage: "",
    types: [],
  }),
  async mounted() {
    try {
      const typesResponse = await axios.get(api + "/coffeetypes");

      if (Array.isArray(typesResponse.data.response)) {
        // Append each element of the response data to the types array
        typesResponse.data.response.forEach((element) => {
          this.types.push(element);
        });
      } else {
        console.error(
          "Invalid response data format:",
          typesResponse.data.response
        );
      }
    } catch (error) {
      console.error("Error fetching coffee types:", error);
    }
  },
  methods: {
    getImageUrl(buffer) {
      if (!buffer) return ""; // Return empty string if buffer is null or undefined
      const uint8Array = new Uint8Array(buffer);
      const base64Image = btoa(String.fromCharCode.apply(null, uint8Array));
      return `data:image/jpeg;base64,${base64Image}`;
    },
    onClickSeeAll() {
      this.itemsPerPage = this.itemsPerPage === 3 ? this.types.length : 3;
    },
  },
  watch: {
    imageData(val) {
      this.imageData = val;
      this.frontImage = this.getImageUrl(val[0].ImageDataFront.data);
    },
    frontImage(val) {
      this.frontImage = val;
    },
    search(val) {
      this.search = val;
    },
    select(val) {
      this.select = val;
    },
  },
};
</script>
<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.9;
  position: absolute;
  width: 100%;
}
.cardbgcolor {
  background-color: rgba(185, 160, 130, 0.5);
}
</style>
