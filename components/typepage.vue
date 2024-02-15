<template>
  <div>
    <v-divider></v-divider>
  </div>
  <div>
    <v-layout style="height: 56px">
      <v-bottom-navigation v-model="value" color="teal">
        <v-btn rounded="xl" color="rgb(140, 115, 70)" height="30" class="mt-5">
          <h4>All</h4>
        </v-btn>
        <v-btn rounded="xl" color="rgb(140, 115, 70)" height="30" class="mt-5">
          <h4>Wet process</h4>
        </v-btn>
        <v-btn rounded="xl" color="rgb(140, 115, 70)" height="30" class="mt-5">
          <h4>Dry process</h4>
        </v-btn>
        <v-btn rounded="xl" color="rgb(140, 115, 70)" height="30" class="mt-5">
          <h4>Honey process</h4>
        </v-btn>
      </v-bottom-navigation>
    </v-layout>
  </div>
  <div class="justify-space-between mb-6">
    <v-row>
      <p class="mt-10 ml-10">Showing All {{ types.length }} Results</p>
    </v-row>
  </div>

  <v-card
    variant="outlined"
    rounded="xl"
    class="mx-auto mt-10"
    color="rgba(185, 160, 130)"
    width="200"
    height="300"
  >
    <v-card
      rounded="xl"
      class="mx-auto"
      color="rgba(185, 160, 130, 0.5)"
      width="200"
      height="300"
    >
      <v-img v-if="frontImage == ''" contain src="@/assets/wet_light.png">
      </v-img>
      <v-img
        v-else
        contain
        :src="getImageUrl(imageData[0].ImageDataFront.data)"
      />
      <v-card-text class="pt-6">
        <div class="text-h5 font-weight-drak text-brown mb-2">Dry Process</div>

        <div class="font-weight-light text-black mb-2">Light Roasted</div>
      </v-card-text>
    </v-card>
  </v-card>

  <v-card>
    <v-data-iterator> </v-data-iterator>
  </v-card>
</template>

<script>
import axios from "axios";
const api = "http://localhost:5000/api";

export default {
  data: () => ({
    value: 0,
    search: "",
    imageData: "",
    frontImage: "",
    types: [
      {
        id: "1",
        image: "../assets/dry_light.png",
        process: "",
        roasting: "",
      },
      {
        id: "2",
        image: "",
        process: "",
        roasting: "",
      },
    ],
  }),
  async mounted() {
    try {
      const imagesResponse = await axios.get(api + "/coffeetype/images/" + 1);

      this.imageData = imagesResponse.data.response;
    } catch (error) {
      console.error("There is error on fetching image:", error);
    }
  },
  methods: {
    getImageUrl(buffer) {
      if (!buffer) return ""; // Return empty string if buffer is null or undefined
      const uint8Array = new Uint8Array(buffer);
      const base64Image = btoa(String.fromCharCode.apply(null, uint8Array));
      return `data:image/jpeg;base64,${base64Image}`;
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
</style>
