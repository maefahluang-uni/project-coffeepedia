<template>
  <div class="d-flex justify-center">
    <div>
      <v-card class="my-10 elevation-10">
        <v-data-table
          :headers="headercategories"
          :items="categories"
          :items-per-page="-1"
        >
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
                <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
                  @submit.prevent
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
                          :rules="categoryNamerule"
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
                <div class="d-flex justify-center align-center">
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
          ><template v-slot:bottom v-if="true"></template> </v-data-table
      ></v-card>
    </div>
    <v-card v-if="showTable2" class="ml-10 my-10 elevation-10">
      <v-data-table
        :headers="headerScores"
        :items="scores"
        :items-per-page="-1"
      >
        <template v-slot:top>
          <v-toolbar color="white">
            <v-toolbar-title class="pr-4">
              <h4>Scores of {{ selectCategory.name }}</h4>
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
                        label="Unit"
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
                  @click="toggleItem(2, item, index)"
                ></v-switch>
              </div>
            </td></tr></template
        ><template v-slot:bottom v-if="true"></template> </v-data-table
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

const selectCategory = ref(null);
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

const headercategories = ref([
  { title: "Category Name", align: "start", key: "name" },

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
const categories = ref([]);

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
const scores = ref([]);

const categoryNamerule = [(v) => !!v || "Category name is required"];
const scoreNameRule = [(v) => !!v || "Score name is required"];

const showScoreTable = async (selectedCategory) => {
  selectCategory.value = selectedCategory;
  showTable2.value = true;
  try {
    const res = await axios.get(
      api + "api/scores/lists/" + selectedCategory.ID,
      {
        headers: apiHaders,
      }
    );
    res.data.response.forEach((element) => {
      Object.assign(element, { iconLoading: false });
    });
    scores.value = res.data.response;
  } catch (err) {
    console.error("Error fetching all category:", err);
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
        name: editedItem.value.name,
      };
      try {
        const res = await axios.post(
          api + "api/scores/post_request_category?edit=true",
          sentItem,
          {
            headers: apiHaders,
          }
        );
        if (res.data.status == 200) {
          Object.assign(categories.value[editedIndex.value], sentItem);
          close();
        }
      } catch (err) {
        console.error("Error update category:", err);
      }
    } else {
      const sentItem = {
        name: editedItem.value.name,
      };
      try {
        const res = await axios.post(
          api + "api/scores/post_request_category?insert=true",
          sentItem,
          {
            headers: apiHaders,
          }
        );
        if (res.data.status == 200) {
          Object.assign(sentItem, { ID: res.data.response.insertId });
          Object.assign(sentItem, { IsActivate: "1" });
          categories.value.push(sentItem);
          close();
        }
      } catch (err) {
        console.error("Error insert category:", err);
      }
    }
    close();
  }
  if (table == 2 && valid.value) {
    if (editedIndex.value > -1) {
      const sentItem = {
        ID: editedItem.value.ID,
        name: editedItem.value.name,
        unit: editedItem.value.unit,
      };
      try {
        const res = await axios.post(
          api + "api/scores/post_request_list?edit=true",
          sentItem,
          {
            headers: apiHaders,
          }
        );
        if (res.data.status == 200) {
          Object.assign(scores.value[editedIndex.value], sentItem);
          close();
        }
      } catch (err) {
        console.error("Error update score list:", err);
      }
    } else {
      const sentItem = {
        categoryID: selectCategory.value.ID,
        name: editedItem.value.name,
        unit: editedItem.value.unit,
      };
      try {
        const res = await axios.post(
          api + "api/scores/post_request_list?insert=true",
          sentItem,
          {
            headers: apiHaders,
          }
        );
        if (res.data.status == 200) {
          Object.assign(sentItem, { ID: res.data.response.insertId });
          Object.assign(sentItem, { IsActivate: "1" });
          scores.value.push(sentItem);
          close();
        }
      } catch (err) {
        console.error("Error insert score list:", err);
      }
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

const toggleItem = async (table, item, index) => {
  if (table == 1) {
    let isactivateNumChange =
      categories.value[index].IsActivate === "1" ? "0" : "1";
    categories.value[index].iconLoading = true;
    const sentItem = {
      ID: item.ID,
      IsActivate: isactivateNumChange,
    };
    try {
      const res = await axios.post(
        api + "api/scores/post_request_category?edit=true",
        sentItem,
        {
          headers: apiHaders,
        }
      );
      if (res.data.status == 200) {
        categories.value[index].IsActivate = isactivateNumChange;
        categories.value[index].iconLoading = false;
      }
    } catch (err) {
      console.error("Error toggle item:", err);
    }
  }
  if (table == 2) {
    let isactivateNumChange =
      scores.value[index].IsActivate === "1" ? "0" : "1";
    scores.value[index].iconLoading = true;
    const sentItem = {
      ID: item.ID,
      IsActivate: isactivateNumChange,
    };
    try {
      const res = await axios.post(
        api + "api/scores/post_request_list?edit=true",
        sentItem,
        {
          headers: apiHaders,
        }
      );
      if (res.data.status == 200) {
        scores.value[index].IsActivate = isactivateNumChange;
        scores.value[index].iconLoading = false;
      }
    } catch (err) {
      console.error("Error toggle item:", err);
    }
  }
};

const getAllCategory = async () => {
  try {
    const res = await axios.get(api + "api/scores/categories", {
      headers: apiHaders,
    });
    res.data.response.forEach((element) => {
      Object.assign(element, { iconLoading: false });
    });
    categories.value = res.data.response;
  } catch (err) {
    console.error("Error fetching all category:", err);
  }
};

onMounted(async () => {
  getAllCategory();
});

watch(showTable2, async (newValue) => {});
</script>
<style scoped></style>
