<template>
  <div class="d-flex justify-center">
    <v-card class="my-10 elevation-10">
      <v-data-table :headers="headerCatagories" :items="catagories">
        <template v-slot:top>
          <v-toolbar color="white">
            <v-toolbar-title class="d-flex">
              <h4>Categories</h4>
            </v-toolbar-title>
            <v-btn
              class="d-none d-sm-flex mr-3"
              color="green"
              variant="tonal"
              rounded="xl"
              @click="addItem(1)"
            >
              <v-icon icon="mdi-plus" color="green"></v-icon>
              Add Category
            </v-btn>
            <v-btn
              class="d-flex d-sm-none"
              color="green"
              variant="tonal"
              rounded="xl"
              @click="addItem(1)"
              ><v-icon icon="mdi-plus" color="green"></v-icon
            ></v-btn>
            <v-dialog
              v-model="dialog1"
              max-width="700px"
              @click:outside="close()"
            >
              <v-form ref="form" v-model="valid" lazy-validation @submit.prevent
                ><v-card
                  ><v-container>
                    <v-card-title>
                      <span class="text-h5">Score category</span>
                    </v-card-title>
                    <v-card-text
                      ><v-text-field
                        class="pr-7"
                        v-model="editedItem.name"
                        label="Category Name*"
                        :rules="catagoryNameRule"
                        required
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
                  </v-container></v-card
                ></v-form
              >
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item="{ item, index }"
          ><tr :class="index % 2 === 0 ? 'even-row' : 'odd-row'">
            <td>
              <p class="news-title">{{ item.name }}</p>
            </td>
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
                  class="d-inline-block"
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
      </v-data-table></v-card
    >

    <v-card v-if="showTable2" class="ml-10 my-10 elevation-10">
      <v-data-table :headers="headerScores" :items="scoresToShow">
        <template v-slot:top>
          <v-toolbar color="white">
            <v-toolbar-title class="d-flex">
              <h4>Scores of {{ selectCatagory.name }}</h4>
            </v-toolbar-title>
            <v-btn
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
            >
              <v-form ref="form" v-model="valid" lazy-validation @submit.prevent
                ><v-card
                  ><v-container>
                    <v-card-title>
                      <span class="text-h5">Score name</span>
                    </v-card-title>
                    <v-card-text
                      ><v-text-field
                        class="pr-7"
                        v-model="editedItem.name"
                        label="Score Name*"
                        :rules="scoreNameRule"
                        required
                      ></v-text-field
                      ><v-text-field
                        class="pr-7"
                        v-model="editedItem.unit"
                        label="Unit*"
                        :rules="unitRule"
                        required
                      ></v-text-field></v-card-text
                    ><v-card-actions>
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
                  </v-container></v-card
                ></v-form
              >
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item="{ item, index }"
          ><tr :class="index % 2 === 0 ? 'even-row' : 'odd-row'">
            <td>
              <p class="news-title">
                {{ item.name }} {{ checkUnit(item.unit) }}
              </p>
            </td>
            <td>
              <div class="d-flex justify-end align-center">
                <v-icon size="small" @click="editItem(2, item, index)">
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
                  class="d-inline-block"
                  @click="toggleItem(2, item, index)"
                ></v-switch>
              </div>
            </td></tr
        ></template> </v-data-table
    ></v-card>
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

const selectCatagory = ref(null);
const editedIndex = ref(-1);
const editedItem = ref({
  ID: 0,
  name: "",
  unit: "",
  IsActivate: "1",
});
const defaultItem = ref({
  ID: 0,
  name: "",
  unit: "",
  IsActivate: "1",
});

const headerCatagories = ref([
  { title: "Catagory Name", align: "start", key: "name" },

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
const catagoryIndex = ref([0]);
const catagories = ref([]);

const headerScores = ref([
  { title: "Score Name", align: "start", key: "name" },

  { title: "Edit", align: "end", key: "actions", sortable: false },
  {
    title: "Status",
    align: "start",
    key: "actions2",
    sortable: false,
  },
]);
const scoreIndex = ref([0]);
const scores = ref([]);
const scoresToShow = ref([]);

const catagoryNameRule = [(v) => !!v || "Catagory name is required"];
const scoreNameRule = [(v) => !!v || "Score name is required"];
const unitRule = [(v) => !!v || "Unit is required"];

const showScoreTable = (selectedCatagory) => {
  if (selectCatagory.value && selectCatagory.value.ID == selectedCatagory.ID) {
    return;
  }
  selectCatagory.value = selectedCatagory;
  scoresToShow.value = [];
  showTable2.value = true;
  scores.value.forEach((element) => {
    if (element.catagoryID == selectedCatagory.ID) {
      scoresToShow.value.push(element);
    }
  });
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
  console.log("cate index", catagoryIndex.value[0]);
  if (table == 1 && valid.value) {
    if (editedIndex.value > -1) {
      const sentItem = {
        ID: editedItem.value.ID,
        name: editedItem.value.name,
        IsActivate: "1",
      };
      Object.assign(catagories.value[editedIndex.value], sentItem);
    } else {
      const sentItem = {
        ID: catagoryIndex.value[0],
        name: editedItem.value.name,
        IsActivate: "1",
      };
      catagories.value.push(sentItem);
      catagoryIndex.value[0] = catagoryIndex.value[0] + 1;
    }
    close();
  }
  if (table == 2 && valid.value) {
    if (editedIndex.value > -1) {
      const sentItem = {
        ID: editedItem.value.ID,
        name: editedItem.value.name,
        unit: editedItem.value.unit,
        IsActivate: "1",
      };
      Object.assign(scores.value[editedIndex.value], sentItem);
      Object.assign(scoresToShow.value[editedIndex.value], sentItem);
    } else {
      const sentItem = {
        ID: scoreIndex.value[0],
        catagoryID: selectCatagory.value.ID,
        name: editedItem.value.name,
        unit: editedItem.value.unit,
        IsActivate: "1",
      };
      scores.value.push(sentItem);
      scoresToShow.value.push(sentItem);
      scoreIndex.value[0] = scoreIndex.value[0] + 1;
    }
    close();
  }
};
const checkUnit = (unit) => {
  if (unit == "-" || !unit) {
    return "";
  }
  return "(" + unit + ")";
};

const toggleItem = async (table, item, index) => {};

const getAllCatagory = async () => {};

onMounted(async () => {
  getAllCatagory();
});

watch(showTable2, async (newValue) => {});
</script>
<style scoped></style>
