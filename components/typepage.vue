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
              v-else-if="!isgettedType"
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
            v-else-if="!isgettedType"
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
      <template v-slot:default="{ items }"
        ><div class="d-flex justify-center mb-10">
          <v-card
            color="rgba(171, 109, 84)"
            width="300"
            class="elevation-4 mx-10"
            rounded="xl"
          >
            <v-card-title class="font-weight-bold text-white text-center mt-5"
              >Light roast</v-card-title
            >
            <div v-for="(item, index) in items" :key="index">
              <v-card
                max-height="258"
                class="mx-5 my-5"
                v-if="item.raw.RoastLevelID == '1'"
                variant="outlined"
                rounded="xl"
                color="rgba(185, 160, 130)"
                @click="clickTypeCard(item.raw.ID, index)"
              >
                <div class="cardbgcolor text-center">
                  <div class="whitebg d-flex justify-center">
                    <img
                      v-if="item.raw.ImageDataFront"
                      :src="apilink + item.raw.ImageDataFront"
                      width="200"
                      class="pa-5"
                    /><v-icon
                      v-else
                      size="200"
                      icon="mdi-image-remove"
                    ></v-icon>
                  </div>
                  <div>
                    <v-card-title class="font-weight-bold text-white">
                      {{
                        item.raw.ProcessName.charAt(0).toUpperCase() +
                        item.raw.ProcessName.slice(1) +
                        " " +
                        item.raw.RoastName.charAt(0).toUpperCase() +
                        item.raw.RoastName.slice(1)
                      }}
                    </v-card-title>
                  </div>
                </div>
              </v-card>
            </div>
          </v-card>

          <v-card
            color="rgba(156, 96, 90)"
            width="300"
            class="elevation-4 mx-10"
            rounded="xl"
          >
            <v-card-title class="font-weight-bold text-white text-center mt-5"
              >Medium roast</v-card-title
            >
            <div v-for="(item, index) in items" :key="index">
              <v-card
                max-height="258"
                class="mx-5 my-5"
                v-if="item.raw.RoastLevelID == '2'"
                variant="outlined"
                rounded="xl"
                color="rgba(185, 160, 130)"
                @click="clickTypeCard(item.raw.ID, index)"
              >
                <div class="cardbgcolor text-center">
                  <div class="whitebg d-flex justify-center">
                    <img
                      v-if="item.raw.ImageDataFront"
                      :src="apilink + item.raw.ImageDataFront"
                      width="200"
                      class="pa-5"
                    /><v-icon
                      v-else
                      size="200"
                      icon="mdi-image-remove"
                    ></v-icon>
                  </div>
                  <div>
                    <v-card-title class="font-weight-bold text-white">
                      {{
                        item.raw.ProcessName.charAt(0).toUpperCase() +
                        item.raw.ProcessName.slice(1) +
                        " " +
                        item.raw.RoastName.charAt(0).toUpperCase() +
                        item.raw.RoastName.slice(1)
                      }}
                    </v-card-title>
                  </div>
                </div>
              </v-card>
            </div>
          </v-card>

          <v-card
            color="rgba(94, 64, 61)"
            width="300"
            class="elevation-4 mx-10"
            rounded="xl"
          >
            <v-card-title class="font-weight-bold text-white text-center mt-5"
              >Dark roast</v-card-title
            >
            <div v-for="(item, index) in items" :key="index">
              <v-card
                max-height="258"
                class="mx-5 my-5"
                v-if="item.raw.RoastLevelID == '3'"
                variant="outlined"
                rounded="xl"
                color="rgba(185, 160, 130)"
                @click="clickTypeCard(item.raw.ID, index)"
              >
                <div class="cardbgcolor text-center">
                  <div class="whitebg d-flex justify-center">
                    <img
                      v-if="item.raw.ImageDataFront"
                      :src="apilink + item.raw.ImageDataFront"
                      width="200"
                      class="pa-5"
                    /><v-icon
                      v-else
                      size="200"
                      icon="mdi-image-remove"
                    ></v-icon>
                  </div>
                  <div>
                    <v-card-title class="font-weight-bold text-white">
                      {{
                        item.raw.ProcessName.charAt(0).toUpperCase() +
                        item.raw.ProcessName.slice(1) +
                        " " +
                        item.raw.RoastName.charAt(0).toUpperCase() +
                        item.raw.RoastName.slice(1)
                      }}
                    </v-card-title>
                  </div>
                </div>
              </v-card>
            </div>
          </v-card>
        </div>

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
                        items[selectedIndex].raw.ProcessName.charAt(
                          0
                        ).toUpperCase() +
                        items[selectedIndex].raw.ProcessName.slice(1) +
                        " process"
                      }}
                    </div>
                    <v-divider
                      class="border-opacity-75 my-3"
                      color="brown"
                    ></v-divider>
                    <div class="font-weight-bold text-black">
                      {{
                        items[selectedIndex].raw.RoastName.charAt(
                          0
                        ).toUpperCase() +
                        items[selectedIndex].raw.RoastName.slice(1) +
                        " roasted"
                      }}
                    </div>
                  </v-card>
                </div>

                <div
                  v-if="detailImageLength == 0"
                  class="justify-center align-center py-5"
                >
                  <div class="d-none d-sm-flex justify-center">
                    <img
                      alt="Front Image"
                      src="@/assets/coffeeimagefront.png"
                      width="125"
                      class="mr-5"
                      contain
                    /><img
                      src="@/assets/coffeeimageback.png"
                      alt="Back Image"
                      width="125"
                      contain
                    />
                  </div>
                  <div class="d-flex d-sm-none justify-center">
                    <img
                      alt="Front Image"
                      src="@/assets/coffeeimagefront.png"
                      width="100"
                      class="mr-5"
                      contain
                    /><img
                      src="@/assets/coffeeimageback.png"
                      alt="Back Image"
                      width="100"
                      contain
                    />
                  </div>

                  <div class="text-center mt-3">No sample images</div>
                </div>
                <div v-else>
                  <div>
                    <v-window v-model="window" show-arrows>
                      <v-window-item v-for="n in detailImageLength" :key="n">
                        <v-card
                          class="d-none d-sm-flex justify-center align-center my-5"
                          height="190"
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
                            alt="Back Image"
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
                            height="190"
                            flat
                          >
                            <img
                              :src="detailImagesFront[n - 1]"
                              alt="Back Image"
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
                      <div v-if="typeDetail[0].MoreDetail">
                        &#x2022; {{ typeDetail[0].MoreDetail }}
                      </div>
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
import config from "../config.js";
const api = config.LOCAL_API_URL;
const apiKey = config.API_KEY;
const apiHaders = { "ngrok-skip-browser-warning": "true", "api-key": apiKey };

export default {
  data: () => ({
    testimage: "",
    overlay: false,
    loading: true,
    itemsPerPage: 20,
    length: 3,
    onboarding: 1,
    showarrow: true,
    isgettedType: false,
    apilink: api,
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
  created() {
    this.getTypes();
  },
  computed: {},
  methods: {
    async getImageUrl(uri) {
      if (!uri) return ""; // Return empty string if buffer is null or undefined
      return config.LOCAL_API_URL + uri;
    },
    async getTypes() {
      this.loadingTypes = true;
      try {
        const typesResponse = await axios.get(api + "api/coffeetypes", {
          headers: apiHaders,
        });
        if (typesResponse.status == 200) {
          this.isgettedType = true;
        }
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
            this.isgettedType = false;
            console.error(
              "Invalid response data format:",
              typesResponse.data.response
            );
          }
        }
      } catch (error) {
        this.loadingTypes = false;
        this.types = [];
        this.isgettedType = false;
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
          api + "api/coffeetypes/images/" + ID,
          {
            headers: apiHaders,
          }
        );
        this.detailImageLength = imagesResponse.data.response.length;
        this.detailImagesFront = [];
        this.detailImagesBack = [];
        imagesResponse.data.response.forEach((element) => {
          this.detailImagesFront.push(api + element.ImageDataFront);
          this.detailImagesBack.push(api + element.ImageDataBack);
        });
      } catch (error) {
        console.error("There is error on fetching image:", error);
      }
    },
    async getTypeDetail(ID) {
      try {
        const typeCoffeeResponse = await axios.get(
          api + "api/coffeetypes/type/" + ID,
          {
            headers: apiHaders,
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
          api + "api/coffeetypes/type/gasstates/" + ID,
          {
            headers: apiHaders,
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
          api + "api/coffeetypes/type/drinks/" + ID,
          {
            headers: apiHaders,
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
    async fetchImage(url) {
      try {
        const res = await axios.get(url, {
          headers: apiHaders,
          responseType: "arraybuffer",
        });
        const uint8Array = new Uint8Array(res.data);
        const base64Image = btoa(String.fromCharCode.apply(null, uint8Array));
        const dataUrl = `data:image/png;base64,${base64Image}`;
        this.testimage = dataUrl;
      } catch (error) {
        console.error("Error fetching Image:", error);
        return "";
      }
    },
  },
  watch: {
    imageData(val) {
      this.imageData = val;

      this.cardImage = this.getImageUrl(val[0].ImageDataFront);
    },
    testimage(val) {
      this.testimage = val;
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
.samples-height {
  height: 190px;
}
</style>
