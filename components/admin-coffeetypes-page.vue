<template>
  <div class="d-flex justify-center my-10">
    <v-card class="card-table">
      <v-data-table
        :headers="headers"
        :items="types"
        :sort-by="[{ key: 'Process', order: 'asc' }]"
        item-value="id"
        :loading="types.length == 0 || roast.length == 0 || process.length == 0"
        key="index"
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
                        item-title="ProcessName"
                        item-value="ID"
                        class="pe-2"
                        label="Process*"
                        :rules="rules.requireInput('Process')"
                        ><template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :title="
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
                        item-title="RoastName"
                        item-value="ID"
                        :rules="rules.requireInput('Roast')"
                        ><template v-slot:item="{ props, item }">
                          <v-list-item
                            v-bind="props"
                            :title="
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
                          disabled
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
                      v-model="editedItem.intervalTempurature"
                      label="Interval temperature*"
                      suffix="°C"
                      :rules="rules.intervalTempurature"
                    ></v-text-field>
                    <v-select
                      class="mb-2"
                      v-model="editedItem.crackState"
                      :items="crackStates"
                      label="Crack state*"
                      item-title="state"
                      item-value="ID"
                      :rules="rules.requireInput('Crack state')"
                      ><template v-slot:item="{ props, item }">
                        <v-list-item
                          v-bind="props"
                          :title="
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
                      label="More detail"
                      variant="solo-filled"
                      :rules="rules.requireInput('More detail')"
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
                          disabled
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
          <v-icon size="small" @click="editItem(item)"> mdi-pencil </v-icon>
        </template>
        <template v-slot:item.actions2="{ item }">
          <div v-if="item.iconLoading" class="pl-2">
            <v-progress-circular
              size="small"
              :width="3"
              indeterminate
            ></v-progress-circular>
          </div>
          <v-switch
            v-else
            v-model="item.IsActivate"
            false-value="0"
            true-value="1"
            color="success"
            hide-details
            class="d-inline-block"
            @click="toggleType(item.ID, item)"
          ></v-switch>
        </template>

        <template v-slot:no-data>
          <v-btn color="primary" @click="getAllTypes"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import config from "../config.js";
const api = config.LOCAL_API_URL;
const apiKey = config.API_KEY;
const apiHaders = { "ngrok-skip-browser-warning": "true", "api-key": apiKey };
const REGEX_NUMBER = /^\d+$/;
const REGEX_INTERVAL_TEMPURATURE = /^(\d+(\.\d+)?\s*-\s*\d+(\.\d+)?)?$/;

export default {
  data: () => ({
    mdi: "mdi-",
    visibleDialog: true,
    dialog: false,
    dialogDelete: false,
    alertSuccess: false,
    switchmodel: 1,
    headers: [
      {
        title: "Process",
        key: "process",
      },
      { title: "Roasted", key: "roasted" },
      { title: "Picture", key: "picture", sortable: false },
      { title: "Common name", key: "commonName" },
      { title: "Edit", key: "actions", sortable: false, align: "end" },
      { title: "Status", key: "actions2", sortable: false },
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
      intervalTempurature: "",
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
      intervalTempurature: "",
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
      intervalTempurature: [
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

    switchmodel(val) {
      console.log(val);
    },
  },

  created() {
    this.getAllProcessAndRoast();
    this.getAllTypes();
  },

  methods: {
    async retryAfterDelay(apiCall) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await apiCall();
    },
    async getAllTypes() {
      try {
        const res = await axios.get(api + "/coffeetypes?admin=true", {
          headers: apiHaders,
        });
        let items = [];
        res.data.response.forEach((element) => {
          let item = {
            ID: element.ID,
            process: element.CoffeeProcessID,
            roasted: element.RoastLevelID,
            commonName: element.CommonName,
            gasStates: [],
            intervalTempurature: element.Tempurature,
            crackState: element.CrackState,
            flavorDetail: element.Flavor,
            moreDetail: element.MoreDetail,
            IsActivate: element.IsActivate,
            ImageDataFront: element.ImageDataFront,
            drinkSuggest: [],
            iconLoading: false,
          };
          items.push(item);
        });
        this.types = items;
      } catch (error) {
        console.error("Error fetching all types:", error);
        await this.retryAfterDelay(this.getAllTypes());
      }
    },
    async toggleType(id, type) {
      let index = this.types.indexOf(type);
      let isactivateNumChange =
        this.types[index].IsActivate === "1" ? "0" : "1";
      let edittype = {
        ID: id,
        IsActivate: isactivateNumChange,
      };
      this.types[index].iconLoading = true;
      try {
        const res = await axios.post(
          api + "/coffeetypes/?edit=true",
          edittype,
          {
            headers: apiHaders,
          }
        );
        if (res.data.status == 200) {
          this.types[index].IsActivate = isactivateNumChange;
          this.types[index].iconLoading = false;
        }
      } catch (error) {
        console.error("Error toggleType:", error);
      }
    },
    async getAllProcessAndRoast() {
      try {
        const res1 = await axios.get(api + "/coffeetypes/process", {
          headers: apiHaders,
        });
        const res2 = await axios.get(api + "/coffeetypes/roast", {
          headers: apiHaders,
        });
        let items1 = [];
        let items2 = [];

        res1.data.response.forEach((element) => {
          if (element.IsActivate == "1") {
            items1.push(element);
          }
        });
        res2.data.response.forEach((element) => {
          if (element.IsActivate == "1") {
            items2.push(element);
          }
        });

        this.process = items1;
        this.roast = items2;
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
          const sentItem = {
            ID: this.editedItem.ID,
            process: this.editedItem.process,
            roasted: this.editedItem.roasted,
            commonName: this.editedItem.commonName,
            intervalTempurature: this.editedItem.intervalTempurature,
            crackState: this.editedItem.crackState,
            flavorDetail: this.editedItem.flavorDetail,
            moreDetail: this.editedItem.moreDetail,
          };
          try {
            const res = await axios.post(
              api + "/coffeetypes?edit=true",
              sentItem,
              {
                headers: apiHaders,
              }
            );
            console.log(res);
            if (res.data.status == 200) {
              Object.assign(this.types[this.editedIndex], this.editedItem);
            }
          } catch (error) {
            console.error("Error update type:", error);
          }
        } else {
          const sentItem = {
            process: this.editedItem.process,
            roasted: this.editedItem.roasted,
            commonName: this.editedItem.commonName,
            intervalTempurature: this.editedItem.intervalTempurature,
            crackState: this.editedItem.crackState,
            flavorDetail: this.editedItem.flavorDetail,
            moreDetail: this.editedItem.moreDetail,
          };
          try {
            const res = await axios.post(
              api + "/coffeetypes?insert=true",
              sentItem,
              {
                headers: apiHaders,
              }
            );
            console.log(res);
            if (res.data.status == 200) {
              this.types.push(this.editedItem);
            }
          } catch (error) {
            console.error("Error update type:", error);
          }
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
<style>
.card-table {
  width: 60vw;
}
.header-bold {
  font-weight: bold;
}
.v-table thead th {
  font-size: 16px;
  font-weight: 800 !important;
}
@media (max-width: 960px) {
  .card-table {
    width: 90vw;
  }
}
</style>
