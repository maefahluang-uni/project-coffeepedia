<template>
  <div class="ma-2">
    <v-data-table
      v-model:expanded="expanded"
      :headers="headers"
      :items="types"
      :sort-by="[{ key: 'Process', order: 'asc' }]"
      item-value="id"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title><h4>Type Coffee Beans</h4></v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ props }">
              <v-btn
                color="green"
                dark
                class="mb-2"
                v-bind="props"
                variant="tonal"
                rounded="xl"
              >
                <v-icon icon="mdi-plus" color="green"></v-icon>
                Add Type
              </v-btn>
            </template>
            <v-form ref="form">
              <v-card>
                <v-container>
                  <v-card-title class="pa-0 mb-4">
                    {{ formTitle }}
                  </v-card-title>
                  <div class="d-flex">
                    <v-select
                      v-model="editedItem.process"
                      :items="process"
                      class="pe-2"
                      label="Process"
                      :rules="rules.requireInput"
                    >
                    </v-select>
                    <v-select
                      v-model="editedItem.roasted"
                      :items="process"
                      label="Roasted"
                      :rules="rules.requireInput"
                    >
                    </v-select>
                  </div>

                  <v-text-field
                    v-model="editedItem.commonName"
                    label="Common name"
                  ></v-text-field>

                  <v-file-input
                    v-slot:item.image="{ item }"
                    accept="image/*"
                    label="Picture"
                  ></v-file-input>

                  <div class="d-flex align-center mb-4">
                    <v-card-title class="pa-0 mr-2"> Gas states </v-card-title>
                    <v-btn
                      class=""
                      variant="tonal"
                      icon="mdi-plus"
                      size="x-small"
                      @click="insertGasState()"
                    >
                    </v-btn>
                  </div>

                  <div
                    v-for="(state, index) in editedItem.gasStates"
                    class="d-flex"
                    :key="index"
                  >
                    <v-btn
                      class="mt-2 mr-2"
                      icon="mdi-minus"
                      variant="text"
                      color="error"
                      size="small"
                      @click="deleteGasState(index)"
                    >
                    </v-btn>
                    <v-text-field
                      class="pe-2"
                      label="Gas"
                      v-model="state.gas"
                      :rules="rules.requireInput"
                    ></v-text-field
                    ><v-text-field
                      label="Tempurature (degree celsius)"
                      v-model="state.WhenTempurature"
                      @keypress="onlyNumber($event, 3)"
                      :rules="rules.requireInput"
                    ></v-text-field>
                  </div>
                </v-container>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue-darken-1" variant="text" @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue-darken-1" variant="text" @click="save">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card></v-form
            >
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this type?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.picture="{ item }">
        <img v-if="item.picture" :src="item.picture" height="30" width="30" />
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="d-flex justify-space-evenly">
          <v-icon size="small" class="pr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
        </div>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
const REGEX_NUMBER = /^[0-9]+$/;
export default {
  data: () => ({
    expanded: [],
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

    editedIndex: -1,
    editedItem: {
      process: "",
      roasted: "",
      picture: "",
      commonName: "",
      pictureUrl: "",
      gasStates: [],
    },
    gasState: {
      gas: 0,
      WhenTempurature: 0,
    },
    defaultItem: {
      process: "",
      roasted: "",
      picture: "",
      commonName: "",
      pictureUrl: "",
      gasStates: [],
    },
    rules: { requireInput: [(v) => !!v || "Field is required"] },
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

  mounted() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.types = [
        {
          id: 1,
          process: "Wet",
          roasted: "Light",
          commonName: "Cinnamon Roast, Half City",
          gasStates: [],
        },
        {
          id: 2,
          process: "Wet",
          roasted: "Medium",
          commonName: "Full City, Regular",
          gasStates: [],
        },
        {
          id: 3,
          process: "Wet",
          roasted: "Dark",
          commonName: "Italian Espresso, Viennese",
          gasStates: [],
        },
      ];
    },
    editItem(item) {
      this.editedIndex = this.types.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
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
    onlyNumber(event, max) {
      if (!REGEX_NUMBER.test(event.key) || event.target.value.length == max) {
        return event.preventDefault();
      }
    },

    insertGasState() {
      this.editedItem.gasStates.push(this.gasState);
      this.gasState = {
        gas: 0,
        WhenTempurature: 0,
      };
    },
    deleteGasState(index) {
      this.editedItem.gasStates.splice(index, 1); // Remove gas state at the specified index
      this.gasState = {
        gas: 0,
        WhenTempurature: 0,
      };
    },
  },
};
</script>
