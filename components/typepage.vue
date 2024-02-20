<template>
  <v-card>
    <div class="justify-center d-flex mt-5 mb-5">
      <v-btn-toggle v-model="filterPocess" class="" mandatory>
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
    <v-data-iterator
      :items="types"
      :items-per-page="itemsPerPage"
      :search="search"
      loading
      loading-text="Loading... Please wait"
    >
      <template v-slot:header>
        <v-toolbar class="px-10 d-flex mt-5" color="white">
          <p class="flex-grow-1">Showing All {{ types.length }} Results</p>
          <!-- <v-text-field
            v-model="search"
            density="comfortable"
            hide-details
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            style="max-width: 300px"
            variant="solo"
          ></v-text-field>-->
        </v-toolbar>
      </template>
      <template v-slot:default="{ items }">
        <v-row class="my-2">
          <v-col
            v-for="(item, index) in items"
            :key="index"
            class="d-flex justify-center"
            cols="12"
            sm="4"
          >
            <v-card
              variant="outlined"
              rounded="xl"
              color="rgba(185, 160, 130)"
              @click="clickTypeCard(item.raw.ID)"
            >
              <div class="cardbgcolor text-center pb-2">
                <div class="whitebg">
                  <img
                    :src="getImageUrl(item.raw.ImageDataFront.data)"
                    width="200"
                  />
                </div>
                <div>
                  <v-card-title class="font-weight-bold text-brown">
                    {{
                      item.raw.ProcessName.charAt(0).toUpperCase() +
                      item.raw.ProcessName.slice(1) +
                      " process"
                    }}
                  </v-card-title>
                  <v-card-subtitle class="text-black">
                    {{
                      item.raw.RoastName.charAt(0).toUpperCase() +
                      item.raw.RoastName.slice(1) +
                      " roasted"
                    }}
                  </v-card-subtitle>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <!--Provide coffee detail on this overlay-->
        <v-overlay
          v-model="overlay"
          contained
          class="align-top justify-center pt-10"
        >
          <v-card>
            <div class="pa-2">
              Coffee details type ID:{{ selectedTypeID }} overlay
            </div>
          </v-card>
        </v-overlay>
      </template>
    </v-data-iterator>
  </v-card>
</template>

<script>
import axios from "axios";
const api = "http://localhost:5000/api";

export default {
  data: () => ({
    overlay: false,
    itemsPerPage: 9,

    filterPocess: "",
    search: "",
    imageData: "",
    frontImage: "",
    selectedTypeID: "",
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
    clickTypeCard(ID) {
      //Caching data just 1 type
      this.overlay = !this.overlay;
      if (ID == this.selectedTypeID) {
        console.log("Clicked ID: " + ID);
        console.log("Not request api and reuse data");
      } else {
        console.log("Request api and use new data");
        this.selectedTypeID = ID;
      }
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
    selectedTypeID(val) {
      this.selectedTypeID = val;
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
.whitebg {
  background-color: white;
}
</style>
