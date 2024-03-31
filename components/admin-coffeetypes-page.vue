<template>
  <div class="ma-2">
    <v-data-table
      :headers="headers"
      :items="types"
      :sort-by="[{ key: 'Process', order: 'asc' }]"
      item-value="id"
      :loading="types.length == 0 || roast.length == 0 || process.length == 0"
    >
      <template v-slot:loading>
        <v-skeleton-loader type="table-row-divider@6"></v-skeleton-loader>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title><h4>Type Coffee Beans</h4></v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer
          ><v-btn
            color="green"
            variant="tonal"
            rounded="xl"
            @click="dialog = !dialog"
          >
            <v-icon icon="mdi-plus" color="green"></v-icon>
            Add Type
          </v-btn>
          <v-dialog v-model="dialog" max-width="700px">
            <v-form ref="form">
              <v-card>
                <v-container>
                  <v-card-title class="pa-0 mb-4">
                    {{ formTitle }}
                  </v-card-title>
                  <div class="d-flex mb-2">
                    <v-select
                      v-model="editedItem.process"
                      :items="process"
                      item-title="ID"
                      item-value="ID"
                      class="pe-2"
                      label="Process*"
                      :rules="rules.requireInput('Process')"
                      ><template v-slot:item="{ props, item }">
                        <v-list-item
                          v-bind="props"
                          :subtitle="
                            item.raw.ProcessName.charAt(0).toUpperCase() +
                            item.raw.ProcessName.slice(1)
                          "
                        ></v-list-item>
                      </template>
                    </v-select>
                    <v-select
                      v-model="editedItem.roasted"
                      :items="roast"
                      label="Roasted*"
                      item-title="ID"
                      item-value="ID"
                      :rules="rules.requireInput('Roast')"
                      ><template v-slot:item="{ props, item }">
                        <v-list-item
                          v-bind="props"
                          :subtitle="
                            item.raw.RoastName.charAt(0).toUpperCase() +
                            item.raw.RoastName.slice(1)
                          "
                        ></v-list-item>
                      </template>
                    </v-select>
                  </div>

                  <v-text-field
                    class="mb-2"
                    v-model="editedItem.commonName"
                    label="Common name*"
                    :rules="rules.requireInput('Common name')"
                  ></v-text-field>
                  <!--:rules="rules.requireInput('Picture')"-->
                  <v-file-input
                    class="mb-2"
                    v-model="pictureFile"
                    v-slot:item.image="{ item }"
                    accept="image/*"
                    label="Picture"
                    disabled
                  ></v-file-input>
                  <div class="mb-7">
                    <v-card
                      class="d-flex justify-center align-center mb-2"
                      width="150"
                      style="z-index: 1"
                      flat
                    >
                      <v-card-title class="pa-0 mr-2">
                        Gas states
                      </v-card-title>
                      <v-btn
                        variant="tonal"
                        icon="mdi-plus"
                        size="x-small"
                        @click="insertGasState()"
                      >
                      </v-btn>
                    </v-card>
                    <v-card
                      class="mt-n6"
                      variant="outlined"
                      v-if="editedItem.gasStates.length != 0"
                    >
                      <div class="mt-6 pe-2">
                        <div
                          v-for="(state, index) in editedItem.gasStates"
                          class="d-flex mb-1"
                          :key="index"
                        >
                          <v-btn
                            class="mt-2"
                            icon="mdi-minus"
                            variant="text"
                            color="error"
                            size="small"
                            @click="deleteGasState(index)"
                          >
                          </v-btn>
                          <v-text-field
                            class="pe-2"
                            label="Gas*"
                            v-model="state.gas"
                            :rules="rules.requireInput('Gas')"
                          ></v-text-field
                          ><v-text-field
                            label="Tempurature*"
                            v-model="state.WhenTempurature"
                            suffix="°C"
                            :rules="rules.onlyNumber('Tempurature')"
                          ></v-text-field>
                        </div>
                      </div>
                    </v-card>
                  </div>
                  <v-text-field
                    class="mb-2"
                    v-model="editedItem.intervalTempureture"
                    label="Interval tempurature*"
                    suffix="°C"
                    :rules="rules.intervalTempureture"
                  ></v-text-field>
                  <v-select
                    class="mb-2"
                    v-model="editedItem.crackState"
                    :items="crackStates"
                    label="Crack state*"
                    item-title="ID"
                    item-value="ID"
                    :rules="rules.requireInput('Crack state')"
                    ><template v-slot:item="{ props, item }">
                      <v-list-item
                        v-bind="props"
                        :subtitle="
                          item.raw.state.charAt(0).toUpperCase() +
                          item.raw.state.slice(1)
                        "
                      ></v-list-item>
                    </template>
                  </v-select>

                  <v-textarea
                    class="mb-2"
                    v-model="editedItem.flavorDetail"
                    label="Flavor detail*"
                    variant="solo-filled"
                    :rules="rules.requireInput('Flavor detail')"
                    flat
                  ></v-textarea>
                  <v-textarea
                    class="mb-2"
                    v-model="editedItem.moreDetail"
                    label="More detail (optional)"
                    variant="solo-filled"
                    flat
                  ></v-textarea>

                  <div class="mb-7">
                    <v-card
                      class="d-flex justify-center align-center mb-2"
                      width="205"
                      style="z-index: 1"
                      flat
                    >
                      <v-card-title class="pa-0 mr-2">
                        Drink suggestion
                      </v-card-title>
                      <v-btn
                        variant="tonal"
                        icon="mdi-plus"
                        size="x-small"
                        @click="insertDrinkSuggest()"
                      >
                      </v-btn>
                    </v-card>
                    <v-card
                      class="mt-n6"
                      variant="outlined"
                      v-if="editedItem.drinkSuggest.length != 0"
                    >
                      <div class="mt-6 pe-2">
                        <div
                          v-for="(drink, index) in editedItem.drinkSuggest"
                          class="d-flex mb-1"
                          :key="index"
                        >
                          <v-btn
                            class="mt-2"
                            icon="mdi-minus"
                            variant="text"
                            color="error"
                            size="small"
                            @click="deleteDrinkSuggest(index)"
                          >
                          </v-btn>
                          <v-text-field
                            class="pe-2"
                            label="Drink name*"
                            v-model="drink.drinkName"
                            :rules="rules.requireInput('Drink name')"
                          ></v-text-field>
                          <v-select
                            :prepend-inner-icon="mdi + drink.icon"
                            class="pe-2"
                            v-model="drink.icon"
                            :items="drinkIcons"
                            label="Drink icon*"
                            :rules="rules.requireInput('Drink icon')"
                          >
                          </v-select>
                        </div>
                      </div>
                    </v-card>
                  </div>
                </v-container>

                <v-card-actions class="mb-2">
                  <v-spacer></v-spacer>
                  <v-btn color="gray" variant="tonal" @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="#6AC479" variant="elevated" @click="save">
                    <div class="font-weight-bold text-white">Save</div>
                  </v-btn>
                </v-card-actions>
              </v-card></v-form
            >
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text">Cancel</v-btn>
                <v-btn color="blue-darken-1" variant="text">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.process="{ item }">
        {{
          getProcessName(item.process).charAt(0).toUpperCase() +
          getProcessName(item.process).slice(1)
        }}
      </template>
      <template v-slot:item.roasted="{ item }">
        {{
          getRoastName(item.roasted).charAt(0).toUpperCase() +
          getRoastName(item.roasted).slice(1)
        }}
      </template>
      <template v-slot:item.picture="{ item }">
        <!--<img v-if="item.picture" :src="item.picture" height="30" width="30" />-->
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="d-flex justify-space-evenly">
          <v-icon size="small" class="pr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon size="small"> mdi-eye </v-icon>
        </div>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import axios from "axios";
import config from "../config.js";
const api = config.LOCAL_API_URL;
const REGEX_NUMBER = /^\d+$/;
const REGEX_INTERVAL_TEMPURATURE = /^(\d+(\.\d+)?\s*-\s*\d+(\.\d+)?)?$/;

export default {
  data: () => ({
    mdi: "mdi-",
    visibleDialog: true,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        title: "Process",
        align: "start",
        key: "process",
      },
      { title: "Roasted", key: "roasted" },
      { title: "Picture", key: "picture", sortable: false },
      { title: "Common name", key: "commonName" },
      { title: "Edit type", key: "actions", sortable: false, align: "center" },
    ],
    types: [],
    process: [],
    roast: [],
    crackStates: [
      { ID: 1, state: "first crack" },
      { ID: 2, state: "between first and second crack" },
      { ID: 3, state: "second crack" },
    ],
    pictureFile: "",
    gasState: {
      gas: "",
      WhenTempurature: "",
    },
    drinkSuggest: {
      drinkName: "",
      icon: "",
    },
    drinkIcons: ["coffee-maker", "coffee", "kettle-pour-over", "cup"],
    editedIndex: -1,
    editedItem: {
      process: "",
      roasted: "",
      picture: "",
      commonName: "",
      pictureUrl: "",
      gasStates: [],
      intervalTempureture: "",
      crackState: "",
      flavorDetail: "",
      moreDetail: "",
      drinkSuggest: [],
    },
    defaultItem: {
      process: "",
      roasted: "",
      picture: "",
      commonName: "",
      pictureUrl: "",
      gasStates: [],
      intervalTempureture: "",
      crackState: "",
      flavorDetail: "",
      moreDetail: "",
      drinkSuggest: [],
    },
    rules: {
      requireInput: (fieldName) => [
        (value) => {
          if (value) return true;
          return `${
            fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
          } is required`;
        },
      ],
      onlyNumber: (fieldName) => [
        (value) => {
          if (value) return true;
          return `${
            fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
          } is required`;
        },
        (value) => {
          if (value && REGEX_NUMBER.test(value)) return true;
          return "Please enter only number";
        },
      ],
      intervalTempureture: [
        (value) => {
          if (value && REGEX_INTERVAL_TEMPURATURE.test(value)) {
            return true;
          }
          return "Please enter a valid format eg. 199-205";
        },
        (value) => {
          if (!value || typeof value !== "string" || !value.includes("-")) {
            return true; // Skip validation if format is invalid or range is not provided
          }
          const [left, right] = value
            .split("-")
            .map((item) => parseFloat(item.trim()));
          if (left >= right) {
            return "Left number must less than right number";
          }
          return true;
        },
      ],
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Type" : "Edit Type";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.getAllProcessAndRoast();
    this.initialize();
  },

  methods: {
    async retryAfterDelay(apiCall) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await apiCall();
    },
    async initialize() {
      this.types = [
        {
          ID: 1,
          process: 3,
          roasted: 1,
          commonName: "Cinnamon Roast, Half City",
          gasStates: [
            {
              gas: "10",
              WhenTempurature: "180",
            },
            {
              gas: "5",
              WhenTempurature: "195",
            },
          ],
          intervalTempureture: "199-205",
          crackState: 1,
          flavorDetail: "Light-bodied and somewhat sour, grassy, and snappy",
          moreDetail: "Suitable for brewing filter",
          drinkSuggest: [
            {
              drinkName: "Espresso",
              icon: "coffee-maker",
            },
            {
              drinkName: "Americano",
              icon: "coffee",
            },
            {
              drinkName: "Drip",
              icon: "kettle-pour-over",
            },
          ],
        },
        {
          ID: 2,
          process: 3,
          roasted: 2,
          commonName: "Full City, Regular",
          gasStates: [],
          intervalTempureture: "",
          crackState: 2,
          flavorDetail: "",
          moreDetail: "",
          drinkSuggest: [],
        },
        {
          ID: 3,
          process: 3,
          roasted: 3,
          commonName: "Italian Espresso, Viennese",
          gasStates: [],
          intervalTempureture: "",
          crackState: 3,
          flavorDetail: "",
          moreDetail: "",
          drinkSuggest: [],
        },
      ];
    },
    async getAllProcessAndRoast() {
      try {
        const res1 = await axios.get(api + "/coffeetypes/process", {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });
        const res2 = await axios.get(api + "/coffeetypes/roast", {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });
        let items1 = [];

        res1.data.response.forEach((element) => {
          if (element.IsActivate == "1") {
            items1.push(element);
          }
        });

        this.process = res1.data.response;
        this.roast = res2.data.response;
      } catch (error) {
        console.error("Error fetching all ProcessAndRoast:", error);
        await this.retryAfterDelay(this.getAllProcessAndRoast());
      }
    },
    editItem(item) {
      this.editedIndex = this.types.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    activateItem(item) {
      this.editedIndex = this.types.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.types.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.pictureFile = "";
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async save() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        if (this.editedIndex > -1) {
          Object.assign(this.types[this.editedIndex], this.editedItem);
        } else {
          this.types.push(this.editedItem);
        }
        this.close();
        return;
      } else {
        const invalidField = this.$refs.form.$el.querySelector(
          ".v-messages__message"
        );
        if (invalidField) {
          invalidField.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    },
    insertGasState() {
      this.editedItem.gasStates.push(this.gasState);
      this.gasState = {
        gas: "",
        WhenTempurature: "",
      };
    },
    deleteGasState(index) {
      this.editedItem.gasStates.splice(index, 1); // Remove gas state at the specified index
      this.gasState = {
        gas: "",
        WhenTempurature: "",
      };
    },
    insertDrinkSuggest() {
      this.editedItem.drinkSuggest.push(this.drinkSuggest);
      this.drinkSuggest = {
        drinkName: "",
        icon: "",
      };
    },
    deleteDrinkSuggest(index) {
      this.editedItem.drinkSuggest.splice(index, 1);
      this.drinkSuggest = {
        drinkName: "",
        icon: "",
      };
    },
    getProcessName(id) {
      const processItem = this.process.find((item) => item.ID === id);
      return processItem ? processItem.ProcessName : null;
    },
    getRoastName(id) {
      const roastItem = this.roast.find((item) => item.ID === id);
      return roastItem ? roastItem.RoastName : null;
    },
  },
};
</script>
