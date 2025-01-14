<template>
  <div class="d-flex justify-center mx-4">
    <div>
      <v-card class="my-10 elevation-10">
        <v-data-table :headers="headervariety" :items="varieties">
          <template v-slot:top>
            <v-toolbar color="white">
              <v-toolbar-title class="d-flex">
                <h4>Varieties</h4>
              </v-toolbar-title>
              <v-btn
                class="d-none d-sm-flex mr-3"
                color="green"
                variant="tonal"
                rounded="xl"
                @click="addItem(1)"
              >
                <v-icon icon="mdi-plus" color="green"></v-icon>
                Add Variety
              </v-btn>
              <v-btn
                class="d-flex d-sm-none"
                color="green"
                variant="tonal"
                rounded="xl"
                @click="addItem(1)"
                ><v-icon icon="mdi-plus" color="green"></v-icon
              ></v-btn>
            </v-toolbar>
            <v-dialog
              v-model="dialog1"
              max-width="700px"
              @click:outside="close()"
            >
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                @submit.prevent
              >
                <v-card
                  ><v-container>
                    <v-card-title>
                      <span class="text-h5">Variety</span>
                    </v-card-title>
                    <v-card-text>
                      <div class="d-flex mb-2">
                        <v-select
                          v-model="editedItem.LocationID"
                          :items="locations"
                          item-title="farmName"
                          item-value="id"
                          :rules="farmNamerule"
                          class="pe-2"
                          label="Farm Name*"
                        >
                        </v-select
                        ><v-select
                          v-model="editedItem.CoffeeProcessID"
                          :items="processes"
                          item-title="ProcessName"
                          item-value="ID"
                          :rules="processrule"
                          label="Process*"
                        >
                        </v-select>
                      </div>
                      <v-text-field
                        v-model="editedItem.code"
                        label="code"
                      ></v-text-field> </v-card-text
                    ><v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="gray" variant="tonal" @click="close()">
                        Cancel
                      </v-btn>
                      <v-btn
                        color="#6AC479"
                        variant="elevated"
                        class="font-weight-bold text-white"
                        type="submit"
                        @click="save(1)"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-container>
                </v-card>
              </v-form>
            </v-dialog>
          </template>
          <template v-slot:item="{ item, index }"
            ><tr :class="index % 2 === 0 ? 'even-row' : 'odd-row'">
              <td>
                <p class="news-title">
                  {{
                    locations.find(
                      (location) => location.id === item.LocationID
                    ).farmName
                  }}
                </p>
              </td>
              <td>
                <p class="news-title">
                  {{
                    locations.find(
                      (location) => location.id === item.LocationID
                    ).subdistrict
                  }},
                  {{
                    locations.find(
                      (location) => location.id === item.LocationID
                    ).district
                  }},
                  {{
                    locations.find(
                      (location) => location.id === item.LocationID
                    ).province
                  }},
                  {{
                    locations.find(
                      (location) => location.id === item.LocationID
                    ).zipcode
                  }}
                </p>
              </td>
              <td>
                {{
                  processes.find(
                    (process) => process.ID === item.CoffeeProcessID
                  ).ProcessName
                }}
              </td>
              <td>{{ checkcode(item.code) }}</td>
              <td>
                <div class="d-flex justify-end align-center">
                  <v-icon size="small" @click="editItem(1, item, index)">
                    mdi-pencil
                  </v-icon>
                </div>
              </td>
              <td>
                <div class="d-flex justify-start align-center">
                  <v-progress-circular
                    v-if="item.iconLoading"
                    size="small"
                    :width="3"
                    indeterminate
                  ></v-progress-circular>
                  <v-switch
                    v-else
                    v-model="item.IsActivate"
                    false-value="0"
                    true-value="1"
                    color="success"
                    hide-details
                    @click="toggleItem(1, item, index)"
                  ></v-switch>
                </div>
              </td>
              <td>
                <div class="d-flex justify-center align-center">
                  <v-icon size="large" @click="showScoreTable(item)">
                    mdi-chevron-right
                  </v-icon>
                </div>
              </td>
            </tr></template
          >
        </v-data-table>
      </v-card>
    </div>
    <div>
      <v-card v-if="showTable2" class="ml-10 my-10 elevation-10"
        ><v-data-table
          :headers="headerScores"
          :items="scores"
          :items-per-page="-1"
          ><template v-slot:top
            ><v-toolbar color="white">
              <v-toolbar-title class="pr-4">
                <h4>
                  Scores of
                  {{
                    locations.find(
                      (location) => location.id === selectVariety.LocationID
                    ).farmName
                  }}
                </h4> </v-toolbar-title
              ><v-btn
                class="d-none d-sm-flex mr-3"
                color="green"
                variant="tonal"
                rounded="xl"
                @click="addItem(2)"
              >
                <v-icon icon="mdi-plus" color="green"></v-icon>
                Add Score
              </v-btn>
              <v-btn
                class="d-flex d-sm-none"
                color="green"
                variant="tonal"
                rounded="xl"
                @click="addItem(2)"
                ><v-icon icon="mdi-plus" color="green"></v-icon
              ></v-btn>
              <v-dialog
                v-model="dialog2"
                max-width="700px"
                @click:outside="close()"
                ><v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                  @submit.prevent
                  ><v-card>
                    <v-container>
                      <v-card-title>
                        <span class="text-h5">Score</span>
                      </v-card-title>
                      <v-card-text> </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="gray" variant="tonal" @click="close()">
                          Cancel
                        </v-btn>
                        <v-btn
                          type="submit"
                          color="#6AC479"
                          variant="elevated"
                          class="font-weight-bold text-white"
                          @click="save(2)"
                        >
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-container>
                  </v-card>
                </v-form>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item="{ item, index }"
            ><tr :class="index % 2 === 0 ? 'even-row' : 'odd-row'">
              <td></td>
              <td></td>
              <td>{{ checknull(item.cup_score) }}</td>
              <td>{{ checknull(item.characteristics) }}</td>
              <td>{{ formatDateNoTime(item.date) }}</td>
              <td>
                <div class="d-flex align-center">
                  <v-icon
                    size="small"
                    @click="editItem(2, item, index)"
                    class="mr-3"
                  >
                    mdi-pencil
                  </v-icon>
                  <v-icon size="small" @click="editItem(3, item, index)">
                    mdi-eye
                  </v-icon>
                </div>
              </td>
              <td>
                <div class="d-flex justify-start align-center">
                  <v-progress-circular
                    v-if="item.iconLoading"
                    size="small"
                    :width="3"
                    indeterminate
                  ></v-progress-circular>
                  <v-switch
                    v-else
                    v-model="item.IsActivate"
                    false-value="0"
                    true-value="1"
                    color="success"
                    hide-details
                    @click="toggleItem(2, item, index)"
                  ></v-switch>
                </div>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import config from "../config.js";
const api = config.LOCAL_API_URL;
const apiKey = config.API_KEY;
const apiHaders = { "ngrok-skip-browser-warning": "true", "api-key": apiKey };

const showTable2 = ref(false);
const dialog1 = ref(false);
const dialog2 = ref(false);

const form = ref(null);
const valid = ref(false);

const locations = ref([]);
const processes = ref([]);

const selectVariety = ref(null);
const editedIndex = ref(-1);
const editedItem = ref({
  ID: 0,
  LocationID: "",
  CoffeeProcessID: "",
  code: "",
  IsActivate: "1",
});
const defaultItem = ref({
  ID: 0,
  LocationID: "",
  CoffeeProcessID: "",
  code: "",
  IsActivate: "1",
});

const headervariety = ref([
  { title: "Farm Name", align: "start", key: "name" },
  { title: "Address", align: "start", key: "address" },
  { title: "Coffee processing", align: "start", key: "process" },
  { title: "Code", align: "start", key: "code" },
  { title: "Edit", align: "end", key: "actions", sortable: false },
  {
    title: "Status",
    align: "start",
    key: "actions2",
    sortable: false,
  },
  {
    title: "Scores",
    align: "center",
    key: "actions3",
    sortable: false,
  },
]);
const varieties = ref([]);
const headerScores = ref([
  { title: "Before", align: "start", key: "before", sortable: false },
  { title: "After", align: "start", key: "After", sortable: false },
  { title: "Cup score", align: "start", key: "cup" },
  { title: "Characteristic", align: "start", key: "character" },
  { title: "Score date", align: "start", key: "date" },
  { title: "Edit", align: "center", key: "actions", sortable: false },
  {
    title: "Status",
    align: "start",
    key: "actions2",
    sortable: false,
  },
]);
const scores = ref([]);

const farmNamerule = [(v) => !!v || "Farm name is required"];
const processrule = [(v) => !!v || "Process is required"];

const showScoreTable = async (selectedVariety) => {
  selectVariety.value = selectedVariety;
  showTable2.value = true;

  try {
    const res = await axios.get(
      api + "api/scores/variety_score/" + selectedVariety.ID,
      {
        headers: apiHaders,
      }
    );
    res.data.response.forEach((element) => {
      Object.assign(element, { iconLoading: false });
    });
    scores.value = res.data.response;
    console.log(scores.value);
  } catch (err) {
    console.error("Error fetching all varieties:", err);
  }
};

const addItem = (table) => {
  editedIndex.value = -1;
  editedItem.value = Object.assign({}, defaultItem);
  if (table == 1) {
    dialog2.value = false;
    dialog1.value = true;
  }
  if (table == 2) {
    dialog1.value = false;
    dialog2.value = true;
  }
};

const editItem = (table, item, index) => {
  editedIndex.value = index;
  editedItem.value = Object.assign({}, item);
  if (table == 1) {
    dialog2.value = false;
    dialog1.value = true;
  }
  if (table == 2) {
    dialog1.value = false;
    dialog2.value = true;
  }
};

const close = () => {
  dialog1.value = false;
  dialog2.value = false;
  editedItem.value = Object.assign({}, defaultItem.value);
  editedIndex.value = -1;
};

const save = async (table) => {
  if (table == 1 && valid.value) {
    if (editedIndex.value > -1) {
      const sentItem = {
        ID: editedItem.value.ID,
        LocationID: editedItem.value.LocationID,
        CoffeeProcessID: editedItem.value.CoffeeProcessID,
        code: editedItem.value.code,
      };
      try {
        Object.assign(varieties.value[editedIndex.value], sentItem);
      } catch (err) {
        console.error("Error update variety:", err);
      }
    } else {
      const sentItem = {
        LocationID: editedItem.value.LocationID,
        CoffeeProcessID: editedItem.value.CoffeeProcessID,
        code: editedItem.value.code,
      };
      try {
      } catch (err) {
        console.error("Error update variety:", err);
      }
    }
  }
};
const toggleItem = async (table, item, index) => {};
const getAllLocation = async () => {
  try {
    const Response = await axios.get(api + "api/location", {
      headers: apiHaders,
    });

    if (Response.status == 200 && Response.data.response != null) {
      locations.value = Response.data.response;
    }
  } catch (err) {
    console.error("Error fetching location:", err);
  }
};
const getAllProcess = async () => {
  try {
    const Response = await axios.get(api + "api/coffeetypes/process", {
      headers: apiHaders,
    });

    if (Response.status == 200 && Response.data.response != null) {
      processes.value = Response.data.response;
    }
  } catch (err) {
    console.error("Error fetching processes:", err);
  }
};

const getAllVarieties = async () => {
  try {
    const res = await axios.get(api + "api/scores/varieties", {
      headers: apiHaders,
    });
    res.data.response.forEach((element) => {
      Object.assign(element, { iconLoading: false });
    });
    varieties.value = res.data.response;
  } catch (err) {
    console.error("Error fetching all varieties:", err);
  }
};

const checkcode = (code) => {
  if (code == "-" || !code) {
    return "-";
  }
  return code;
};
const checknull =(text)=>{
    if (text == "-" || !text) {
    return "NA";
  }
  return text;
}

const formatDateNoTime = (datetime) => {
  const date = new Date(datetime);
  const options = { month: "short", day: "numeric", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  return formattedDate;
};
onMounted(async () => {
  getAllLocation();
  getAllProcess();
  getAllVarieties();
});
</script>
