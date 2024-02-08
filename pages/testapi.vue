<template>
  <div>
    <v-container>
      <v-row v-if="(types == null) & (frontImage == '')"> no types </v-row>
      <div v-else>
        <v-row class="justify-center">
          <img
            :src="frontImage"
            alt="Front Image"
            width="150"
            max-height="100"
            class="mr-10"
            contain
          />
          <img
            :src="backImage"
            alt="Front Image"
            width="150"
            max-height="100"
            contain
          />
        </v-row>

        {{ types[0].ID }}
        <br />{{ types[0].RoastName }} <br />{{ types[0].Tempurature }}
        °C
        <br />
        <div v-if="types[0].CrackState == '1'">first crack</div>
        <div v-else-if="types[0].CrackState == '2'">
          between first and second crack
        </div>
        <div v-else="types[0].CrackState == '3'">second crack</div>
        {{ types[0].ProcessName }} <br />{{ types[0].Flavor }}
      </div>
    </v-container>
    <v-btn @click="minusIndex()">left</v-btn>
    <v-btn @click="plusIndex()">right</v-btn>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      index: 0,
      types: null, // Initialize types as null or an empty array/object
      frontImage: "",
      backImage: "",
    };
  },
  async mounted() {
    try {
      const res = await axios.get("http://localhost:5000/api/coffeetypes");
      this.types = res.data.response; // Assign response data to types
    } catch (error) {
      console.error("Error fetching coffee types:", error);
    }
  },
  methods: {
    plusIndex() {
      if (this.index < this.types.length - 1) {
        this.index++;
      }
    },
    minusIndex() {
      if (this.index > 0) {
        this.index--;
      }
    },
    getImageUrl(buffer) {
      if (!buffer) return ""; // Return empty string if buffer is null or undefined
      const uint8Array = new Uint8Array(buffer);
      const base64Image = btoa(String.fromCharCode.apply(null, uint8Array));
      return `data:image/jpeg;base64,${base64Image}`;
    },
  },
  watch: {
    types(val) {
      this.types = val;
      try {
        this.frontImage = this.getImageUrl(
          this.types[this.index].ImageDataFront.data
        );
        this.backImage = this.getImageUrl(
          this.types[this.index].ImageDataBack.data
        );
      } catch (error) {
        console.log("There is error on watch:", error);
      }
    },
    frontImage(val) {
      this.frontImage = val;
    },
    backImage(val) {
      this.backImage = val;
    },
    index(val) {
      this.index = val;
      this.frontImage = this.getImageUrl(
        this.types[this.index].ImageDataFront.data
      );
      this.backImage = this.getImageUrl(
        this.types[this.index].ImageDataBack.data
      );
    },
  },
};
</script>

<style>
/* Add custom styles here if needed */
</style>
