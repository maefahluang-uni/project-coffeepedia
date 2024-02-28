<template>
  <v-card>
    <div class="justify-center d-none d-sm-flex mt-5 mb-5">
      <v-btn-toggle v-model="filterProcess" mandatory>
        <v-btn
          color="rgb(140, 115, 70)"
          value=""
          class="mx-3 my-2"
          rounded="xl"
          text="All"
        >
        </v-btn>
        <v-btn
          color="rgb(140, 115, 70)"
          value="wet"
          class="mx-3 my-2"
          rounded="xl"
          text="Wet process"
        >
        </v-btn>
        <v-btn
          color="rgb(140, 115, 70)"
          value="dry"
          class="mx-3 my-2"
          rounded="xl"
          text="Dry process"
        >
        </v-btn>
        <v-btn
          color="rgb(140, 115, 70)"
          value="honey"
          class="mx-3 my-2"
          rounded="xl"
          text="Honey process"
        >
        </v-btn>
      </v-btn-toggle>
    </div>

    <v-data-iterator
      :items="types"
      :items-per-page="itemsPerPage"
      :search="search || filterProcess"
    >
      <template v-slot:header="{ items }">
        <div class="d-none d-sm-flex">
          <v-toolbar class="px-10 d-flex my-5" color="white">
            <div v-if="loadingTypes" class="d-flex align-center flex-grow-1">
              <v-progress-circular
                :size="30"
                :width="2"
                indeterminate
              ></v-progress-circular>
              <div class="pl-2">Loading types coffee bean..</div>
            </div>
            <div
              v-else-if="types.length == 0"
              class="flex-grow-1 d-flex align-center"
            >
              <div class="mr-3">Cannot get types coffee bean</div>
              <v-btn variant="outlined" @click="getTypes()" color="error"
                >Retry</v-btn
              >
            </div>
            <p v-else class="flex-grow-1">
              Showing All {{ items.length }} Results
            </p>
            <v-text-field
              v-model="search"
              density="comfortable"
              hide-details
              placeholder="Search"
              prepend-inner-icon="mdi-magnify"
              style="max-width: 300px"
              variant="solo"
            ></v-text-field>
          </v-toolbar>
        </div>
        <div class="d-flex-column d-sm-none px-10 my-5">
          <v-text-field
            v-model="search"
            density="comfortable"
            hide-details
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            variant="solo"
            class="mb-5"
          ></v-text-field>
          <div v-if="loadingTypes" class="d-flex align-center">
            <v-progress-circular
              :size="30"
              :width="2"
              indeterminate
            ></v-progress-circular>
            <div class="pl-2">Loading types coffee bean..</div>
          </div>
          <div
            v-else-if="types.length == 0"
            class="flex-grow-1 d-flex align-center"
          >
            <div class="mr-3">Cannot get types coffee bean</div>
            <v-btn variant="outlined" @click="getTypes()" color="error"
              >Retry</v-btn
            >
          </div>
          <p v-else>Showing All {{ items.length }} Results</p>
        </div>
      </template>
      <template v-slot:default="{ items }">
        <v-row class="px-2 mb-2">
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
              @click="clickTypeCard(item.raw.ID, index)"
            >
              <div class="cardbgcolor text-center pb-2">
                <div class="whitebg d-flex justify-center">
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
                      " roast"
                    }}
                  </v-card-subtitle>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <!--Provide coffee detail on this overlay-->
        <v-overlay v-model="overlay" class="align-top justify-center pt-10">
          <v-card
            class="overflow-auto cardheightflex cardwidthflex d-flex justify-center"
          >
            <div v-if="typeDetail == ''" class="d-flex align-center">
              <v-progress-circular
                :size="70"
                :width="7"
                indeterminate
              ></v-progress-circular>
            </div>
            <v-container v-else>
              <div class="pb-5 align-center">
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
                  <v-progress-circular
                    :size="30"
                    :width="2"
                    indeterminate
                  ></v-progress-circular>
                  <div class="pl-2">Loading sample images..</div>
                </div>
                <div v-else>
                  <div>
                    <v-window v-model="window" show-arrows>
                      <v-window-item v-for="n in detailImageLength" :key="n">
                        <v-card
                          class="d-none d-sm-flex justify-center align-center my-5"
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
                    <div>
                      <v-window v-model="window">
                        <v-window-item v-for="n in detailImageLength" :key="n">
                          <v-card
                            class="d-flex justify-center align-center my-5"
                            flat
                          >
                            <img
                              :src="detailImagesFront[n - 1]"
                              alt="Front Image"
                              width="125"
                              class="mr-5"
                              contain
                            />
                            <img
                              :src="detailImagesBack[n - 1]"
                              alt="Front Image"
                              width="125"
                              contain
                            />
                          </v-card>
                        </v-window-item>
                      </v-window>
                      <v-item-group
                        v-model="window"
                        class="text-center"
                        mandatory
                      >
                        <v-item
                          v-for="n in detailImageLength"
                          :key="`btn-${n}`"
                          v-slot="{ isSelected, toggle }"
                          :value="n - 1"
                        >
                          <v-icon
                            size="15"
                            :color="
                              isSelected
                                ? 'rgba(000, 000, 000, 0.5)'
                                : 'rgba(000, 000, 000, 0.2)'
                            "
                            @click="toggle"
                            >mdi-record</v-icon
                          >
                        </v-item>
                      </v-item-group>
                    </div>
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
                <div class="mt-10">
                  <v-card class="mx-5" flat>
                    <div class="font-weight-bold text-brown text-h5">
                      Coffee drink suggestion
                    </div>
                    <v-divider
                      class="border-opacity-75 my-3"
                      color="brown"
                    ></v-divider>
                  </v-card>
                </div>

                <div
                  v-if="loadingSuggest"
                  class="d-flex align-center justify-center"
                >
                  <v-progress-circular
                    :size="30"
                    :width="2"
                    indeterminate
                  ></v-progress-circular>
                  <div class="pl-2">Loading sugestion..</div>
                </div>
                <div v-else-if="drinkSuggest == ''" class="text-center">
                  No drink suggestion
                </div>
                <div v-else>
                  <div class="d-none d-sm-flex justify-space-between">
                    <v-card
                      v-for="(drink, index) in drinkSuggest"
                      :key="index"
                      width="150"
                      class="rounded-xl mx-5"
                      variant="outlined"
                      color="rgb(140, 115, 70)"
                    >
                      <div class="d-flex justify-center mt-3">
                        <v-icon size="40" color="black"
                          >mdi-{{ drink.icon }}</v-icon
                        >
                      </div>

                      <div class="font-weight-bold text-center pa-3">
                        {{ drink.DrinkName }}
                      </div>
                    </v-card>
                  </div>
                </div>

                <div
                  v-for="(drink, index) in drinkSuggest"
                  :key="index"
                  class="d-flex d-sm-none justify-center mx-5 mb-5"
                >
                  <v-card
                    width="500"
                    class="rounded-xl"
                    variant="outlined"
                    color="rgb(140, 115, 70)"
                  >
                    <div class="d-flex justify-center mt-3">
                      <v-icon size="40" color="black"
                        >mdi-{{ drink.icon }}</v-icon
                      >
                    </div>

                    <div class="font-weight-bold text-center pa-3">
                      {{ drink.DrinkName }}
                    </div>
                  </v-card>
                </div>
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
import config from '../config.js';
const api = config.LOCAL_API_URL;

export default {
  data: () => ({
    overlay: false,
    loading: true,
    itemsPerPage: 9,
    length: 3,
    onboarding: 1,
    showarrow: true,

    filterProcess: "",
    search: "",
    imageData: "",
    cardImage: "",
    selectedTypeID: "",
    selectedIndex: "",
    types: [],
    storedSelectedType: [],

    class: "",
    typeDetail: "",
    gasStates: "",
    detailImageLength: 0,
    detailImagesFront: [],
    detailImagesBack: [],
    frontImage: "",
    backImage: "",
    drinkSuggest: "",
    loadingTypes: true,
    loadingSuggest: true,
    window: 0,
  }),
  mounted() {
    this.getTypes();
  },
  computed: {},
  methods: {
    getImageUrl(buffer) {
      if (!buffer) return ""; // Return empty string if buffer is null or undefined
      const uint8Array = new Uint8Array(buffer);
      const base64Image = btoa(String.fromCharCode.apply(null, uint8Array));
      return `data:image/jpeg;base64,${base64Image}`;
    },
    async getTypes() {
      this.loadingTypes = true;
      try {
        const typesResponse = await axios.get(api + "/coffeetypes", {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });

        if (typesResponse.data.response != null) {
          if (Array.isArray(typesResponse.data.response)) {
            // Append each element of the response data to the types array
            typesResponse.data.response.forEach((element) => {
              this.types.push(element);
            });
            this.loadingTypes = false;
          } else {
            this.loadingTypes = false;
            this.types = [];
            console.error(
              "Invalid response data format:",
              typesResponse.data.response
            );
          }
        }
      } catch (error) {
        this.loadingTypes = false;
        this.types = [];
        console.error("Error fetching coffee types:", error);
      }
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
        this.loadingSuggest = true;
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
          api + "/coffeetypes/images/" + ID,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          }
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
          api + "/coffeetypes/type/" + ID,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        this.typeDetail = typeCoffeeResponse.data.response;
      } catch (error) {
        console.error("Error fetching coffee type:", error);
      }
    },
    async getTypeGasStates(ID) {
      try {
        const gasStatesResponse = await axios.get(
          api + "/coffeetypes/type/gasstates/" + ID,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        this.gasStates = gasStatesResponse.data.response;
      } catch (error) {
        console.error("Error fetching coffee type gas states:", error);
      }
    },
    async getTypeDrinkSuggestion(ID) {
      try {
        const drinksResponse = await axios.get(
          api + "/coffeetypes/type/drinks/" + ID,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        if (drinksResponse.data.response != null) {
          this.loadingSuggest = false;
          this.drinkSuggest = drinksResponse.data.response;
        } else {
          this.loadingSuggest = false;
          this.drinkSuggest = "";
        }
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
    types(val) {
      this.types = val;
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
