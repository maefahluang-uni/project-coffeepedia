<template>
  <div>
    <v-container>
      <div
        v-if="(type == null) & (detailImageData == '')"
        class="d-flex justify-center"
      >
        <span class="text-h2">No data</span>
      </div>
      <div v-else>
        <v-window v-model="window" show-arrows>
          <v-window-item v-for="n in detailImageData.length" :key="n">
            <v-card height="200px" class="d-flex justify-center align-center">
              <img
                :src="
                  this.getImageUrl(detailImageData[n - 1].ImageDataFront.data)
                "
                alt="Front Image"
                width="150"
                class="mr-10"
                contain
              />
              <img
                :src="
                  this.getImageUrl(detailImageData[n - 1].ImageDataBack.data)
                "
                alt="Front Image"
                width="150"
                contain
              />
            </v-card>
          </v-window-item>
        </v-window>

        <div class="text-center">
          {{ type[0].ID }}
          <br />{{ type[0].RoastName }} <br />{{ type[0].Tempurature }}
          °C
          <br />
          <div v-if="type[0].CrackState == '1'">first crack</div>
          <div v-else-if="type[0].CrackState == '2'">
            between first and second crack
          </div>
          <div v-else="type[0].CrackState == '3'">second crack</div>
          {{ type[0].ProcessName }} <br />{{ type[0].Flavor }}
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
const api = "http://localhost:5000/api";
export default {
  data() {
    return {
      index: 0,
      type: null, // Initialize types as null or an empty array/object
      detailImageData: "",
      frontImage: "",
      backImage: "",
      window: 0,
    };
  },
  async mounted() {
    try {
      const typeCoffeeResponse = await axios.get(
        api + "/coffeetypes/type/" + 1
      );
      this.type = typeCoffeeResponse.data.response; // Assign response data to types
    } catch (error) {
      console.error("Error fetching coffee type:", error);
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
    async type(val) {
      this.type = val;
      try {
        const imagesResponse = await axios.get(
          api + "/coffeetypes/images/" + 1
        );

        this.detailImageData = imagesResponse.data.response;
        console.log(this.detailImageData);
      } catch (error) {
        console.error("There is error on fetching image:", error);
      }
    },
  },
};
</script>

<style>
/* Add custom styles here if needed */
</style>
