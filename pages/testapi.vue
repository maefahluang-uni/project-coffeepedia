<template>
  <div>
    <v-container>
      <div
        v-if="(type == null) & (imageData == '')"
        class="d-flex justify-center"
      >
        <span class="text-h2">No data</span>
      </div>
      <div v-else>
        <!-- Faster than v-window
           <v-row class="justify-center align-center">
          <v-btn v-show="index != 0" class="mr-10" @click="minusIndex()"
            >left</v-btn
          >
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
          <v-btn class="ml-10" @click="plusIndex()">right</v-btn>
        </v-row>-->
        <v-window v-model="window" show-arrows>
          <v-window-item v-for="n in imageData.length" :key="n">
            <v-card height="200px" class="d-flex justify-center align-center">
              <img
                :src="this.getImageUrl(imageData[n - 1].ImageDataFront.data)"
                alt="Front Image"
                width="150"
                class="mr-10"
                contain
              />
              <img
                :src="this.getImageUrl(imageData[n - 1].ImageDataBack.data)"
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
      imageData: "",
      frontImage: "",
      backImage: "",
      window: 0,
    };
  },
  async mounted() {
    try {
      const typeCoffeeResponse = await axios.get(api + "/coffeetype/" + 1);
      this.type = typeCoffeeResponse.data.response; // Assign response data to types
    } catch (error) {
      console.error("Error fetching coffee types:", error);
    }
  },
  methods: {
    /* Faster than v-window
    plusIndex() {
      if (this.index < this.imageData.length - 1) {
        this.index++;
      }
    },
    minusIndex() {
      if (this.index > 0) {
        this.index--;
      }
    },*/
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
        const imagesResponse = await axios.get(api + "/coffeetype/images/" + 1);

        this.imageData = imagesResponse.data.response;
        console.log(this.imageData);
      } catch (error) {
        console.error("There is error on fetching image:", error);
      }
    } /* Faster than v-window
    frontImage(val) {
      this.frontImage = val;
    },
    backImage(val) {
      this.backImage = val;
    },
    imageData(val) {
      this.frontImage = this.getImageUrl(val[this.index].ImageDataFront.data);
      this.backImage = this.getImageUrl(val[this.index].ImageDataBack.data);
    },  
    index(val) {
      this.index = val;
      console.log(this.index);
      try {
        if (this.frontImage != "") {
          this.frontImage = this.getImageUrl(
            // this.type[this.index].ImageDataFront.data
            this.imageData[this.index].ImageDataFront.data
          );
        } else {
          this.frontImage = "";
        }
        if (this.backImage != "") {
          this.backImage = this.getImageUrl(
            //  this.type[this.index].ImageDataBack.data
            this.imageData[this.index].ImageDataBack.data
          );
        } else {
          this.backImage = "";
        }
      } catch (error) {
        console.log("There is error changing image:", error);
      }
    },*/,
  },
};
</script>

<style>
/* Add custom styles here if needed */
</style>
