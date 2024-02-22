<template>
  <v-card>
    <div class="justify-center d-flex mt-5 mb-5">
      <v-btn-toggle v-model="filterPocess" class="d-none d-sm-flex" mandatory>
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
          class="ml-3 mr-3 my-2"
          rounded="xl"
          text="Honey process"
        >
        </v-btn>
      </v-btn-toggle>
      <div class="d-flex d-sm-none">{Process dropdown list}</div>
    </div>
    <v-data-iterator
      :items="types"
      :items-per-page="itemsPerPage"
      :search="search"
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
        <v-row class="px-2">
          <v-col
            v-for="(item, index) in items"
            :key="index"
            class="d-flex justify-center my-5"
            cols="12"
            sm="4"
          >
            <v-card
              variant="outlined"
              rounded="xl"
              color="rgba(185, 160, 130)"
              @click="clickTypeCard(item.raw.ID, index)"
            >
              <div class="cardbgcolor text-center pb-2">
                <div class="whitebg">
                  <img
                    :src="getImageUrl(item.raw.ImageDataFront.data)"
                    width="200"
                    class="pa-5"
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
                  <v-card-subtitle class="font-weight-bold text-black">
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
        <v-overlay v-model="overlay" class="align-top justify-center pt-10">
          <v-card class="overflow-auto cardheightflex cardwidthflex">
            <v-container>
              <div
                v-if="
                  (typeDetail == '') &
                  (gasStates == '') &
                  (drinkSuggest == '') &
                  (detailImageLength == 0) &
                  (drinkSuggest == '')
                "
              >
                <span class="text-h3">No type data</span>
              </div>
              <div v-else>
                <div class="d-flex justify-center text-center mt-5">
                  <v-card max-width="250" flat>
                    <div class="font-weight-bold text-brown text-h4">
                      {{
                        types[selectedIndex].ProcessName.charAt(
                          0
                        ).toUpperCase() +
                        types[selectedIndex].ProcessName.slice(1) +
                        " process"
                      }}
                    </div>
                    <v-divider
                      class="border-opacity-75 my-3"
                      color="brown"
                    ></v-divider>
                    <div class="font-weight-bold text-black">
                      {{
                        types[selectedIndex].RoastName.charAt(0).toUpperCase() +
                        types[selectedIndex].RoastName.slice(1) +
                        " roasted"
                      }}
                    </div>
                  </v-card>
                </div>

                <div
                  v-if="detailImageLength == 0"
                  class="d-flex justify-center align-center py-5"
                >
                  <v-icon size="50">mdi-image-multiple</v-icon>
                  <div>No roasted coffee images</div>
                </div>
                <div v-else class="">
                  <div>
                    <v-window v-model="window" show-arrows>
                      <v-window-item v-for="n in detailImageLength" :key="n">
                        <v-card
                          height="200px"
                          class="d-none d-sm-flex justify-center align-center"
                          flat
                        >
                          <img
                            :src="detailImagesFront[n - 1]"
                            alt="Front Image"
                            width="150"
                            class="mr-10"
                            contain
                          />
                          <img
                            :src="detailImagesBack[n - 1]"
                            alt="Front Image"
                            width="150"
                            contain
                          />
                        </v-card>
                      </v-window-item>
                    </v-window>
                  </div>

                  <div class="py-5 d-flex d-sm-none justify-center">
                    <v-window v-model="window">
                      <v-window-item v-for="n in detailImageLength" :key="n">
                        <v-card
                          height="100px"
                          class="d-flex justify-center align-center"
                          flat
                        >
                          <img
                            :src="detailImagesFront[n - 1]"
                            alt="Front Image"
                            width="100"
                            class="mr-5"
                            contain
                          />
                          <img
                            :src="detailImagesBack[n - 1]"
                            alt="Front Image"
                            width="100"
                            contain
                          />
                        </v-card>
                      </v-window-item>
                    </v-window>
                  </div>
                </div>

                <div class="d-flex justify-center mb-5">
                  <v-card
                    width="500"
                    class="pa-5"
                    variant="outlined"
                    rounded="xl"
                    color="rgb(140, 115, 70)"
                  >
                    <div class="text-black">
                      <div>
                        &#x2022;
                        {{
                          typeDetail[0].RoastName.charAt(0).toUpperCase() +
                          typeDetail[0].RoastName.slice(1)
                        }}
                        ({{ typeDetail[0].CommonName }})
                      </div>
                      <div>&#x2022; {{ typeDetail[0].Tempurature }}°C</div>
                      <div
                        v-if="gasStates != ''"
                        v-for="(item, index) in gasStates"
                        :key="index"
                      >
                        &#x2022; Gas {{ gasStates[index].Gas }} when
                        {{ gasStates[index].WhenTempurature }} °C
                      </div>
                      <div v-else>&#x2022; No gas detail</div>
                      <div v-if="typeDetail[0].CrackState == '1'">
                        &#x2022; First crack
                      </div>
                      <div v-else-if="typeDetail[0].CrackState == '2'">
                        &#x2022; Between first and second crack
                      </div>
                      <div v-else="typeDetail[0].CrackState == '3'">
                        &#x2022; Second crack
                      </div>
                      <div>&#x2022; {{ typeDetail[0].Flavor }}</div>
                      <div>&#x2022; {{ typeDetail[0].MoreDetail }}</div>
                    </div>
                  </v-card>
                </div>

                <v-card class="mx-5" flat>
                  <div class="font-weight-bold text-brown text-h5">
                    Coffee drink suggestion
                  </div>
                  <v-divider
                    class="border-opacity-75 my-3"
                    color="brown"
                  ></v-divider>
                  <div v-if="drinkSuggest == ''" class="text-center">
                    No drink suggestion
                  </div>
                  <div v-else>
                    <div
                      class="d-flex"
                      v-for="(drink, index) in drinkSuggest"
                      :key="index"
                      cols="12"
                      sm="4"
                    >
                      <v-col>
                        <v-card
                          class="rounded-xl"
                          variant="outlined"
                          color="rgb(140, 115, 70)"
                        >
                          <div class="d-flex justify-center mt-3">
                            <v-icon size="40" color="black"
                              >mdi-{{ drinkSuggest[index].icon }}</v-icon
                            >
                          </div>

                          <div class="font-weight-bold text-center pa-3">
                            {{ drinkSuggest[index].DrinkName }}
                          </div>
                        </v-card>
                      </v-col>
                    </div>
                  </div>
                </v-card>
              </div>
            </v-container>
          </v-card>
        </v-overlay>
      </template>
    </v-data-iterator>
  </v-card>
</template>

<script>
import axios from "axios";
//https://5ea0-202-28-45-143.ngrok-free.app/
//const api = "http://localhost:5000/api";
const api = "http://localhost:5000/api";

export default {
  data: () => ({
    overlay: false,
    loading: true,
    itemsPerPage: 9,
    length: 3,
    onboarding: 1,
    showarrow: true,

    filterPocess: "",
    search: "",
    imageData: "",
    cardImage: "",
    selectedTypeID: "",
    selectedIndex: "",
    types: [],

    class: "",
    typeDetail: "",
    gasStates: "",
    detailImageLength: 0,
    detailImagesFront: [],
    detailImagesBack: [],
    frontImage: "",
    backImage: "",
    drinkSuggest: "",
    window: 0,
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
  computed: {},
  methods: {
    getImageUrl(buffer) {
      if (!buffer) return ""; // Return empty string if buffer is null or undefined
      const uint8Array = new Uint8Array(buffer);
      const base64Image = btoa(String.fromCharCode.apply(null, uint8Array));
      return `data:image/jpeg;base64,${base64Image}`;
    },
    async clickTypeCard(ID, index) {
      this.overlay = !this.overlay;
      this.selectedIndex = index;
      if (ID != this.selectedTypeID) {
        this.selectedTypeID = ID;

        this.typeDetail = "";
        this.gasStates = "";
        this.drinkSuggest = "";
        this.detailImageLength = 0;
        this.drinkSuggest = "";
        try {
          this.getTypeDetail(ID);
          this.getDetailImages(ID);
          this.getTypeGasStates(ID);
          this.getTypeDrinkSuggestion(ID);
          this.loading = false;
        } catch (error) {
          console.error("Error fetching coffee type:", error);
        }
      }
    },
    async getDetailImages(ID) {
      try {
        const imagesResponse = await axios.get(
          api + "/coffeetypes/images/" + ID
        );

        this.detailImageLength = imagesResponse.data.response.length;

        imagesResponse.data.response.forEach((element) => {
          this.detailImagesFront.push(
            this.getImageUrl(element.ImageDataFront.data)
          );
          this.detailImagesBack.push(
            this.getImageUrl(element.ImageDataBack.data)
          );
        });
      } catch (error) {
        console.error("There is error on fetching image:", error);
      }
    },
    async getTypeDetail(ID) {
      try {
        const typeCoffeeResponse = await axios.get(
          api + "/coffeetypes/type/" + ID
        );
        this.typeDetail = typeCoffeeResponse.data.response;
      } catch (error) {
        console.error("Error fetching coffee type:", error);
      }
    },
    async getTypeGasStates(ID) {
      try {
        const gasStatesResponse = await axios.get(
          api + "/coffeetypes/type/gasstates/" + ID
        );
        this.gasStates = gasStatesResponse.data.response;
      } catch (error) {
        console.error("Error fetching coffee type gas states:", error);
      }
    },
    async getTypeDrinkSuggestion(ID) {
      try {
        const drinksResponse = await axios.get(
          api + "/coffeetypes/type/drinks/" + ID
        );
        this.drinkSuggest = drinksResponse.data.response;
        //console.log(drinksResponse.data.response[1].DrinkName);
      } catch (error) {
        console.error("Error fetching coffee type gas states:", error);
      }
    },
  },
  watch: {
    imageData(val) {
      this.imageData = val;

      this.cardImage = this.getImageUrl(val[0].ImageDataFront.data);
    },
    cardImage(val) {
      this.cardImage = val;
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
    overlay(val) {
      if (val == true) {
        this.window = 0;
      }
    },
    typeDetail(val) {
      this.typeDetail = val;
    },
    gasStates(val) {
      this.gasStates = val;
    },
    drinkSuggest(val) {
      this.drinkSuggest = val;
    },
    detailImageLength(val) {
      this.detailImageLength = val;
    },
    drinkSuggest(val) {
      this.drinkSuggest = val;
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
.cardheightflex {
  height: 85dvh;
}
.cardwidthflex {
  width: 85dvw;
  max-width: 700px;
}
</style>
