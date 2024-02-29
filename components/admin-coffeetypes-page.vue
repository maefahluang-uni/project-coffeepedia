<template>
  <div><v-divider></v-divider></div>
  <div>
    <v-data-table
      :headers="headers"
      :items="process"
      :sort-by="[{ key: 'Process', order: 'asc' }]"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title><h4>Type Coffee Beans</h4></v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ props }">
              <v-btn color="green" dark class="mb-2" v-bind="props">
                <v-icon icon="mdi-plus" color="green"></v-icon>
                Add Type
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Process"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.roasted"
                        label="Roasted"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-file-input
                        accept="image/*"
                        label="Picture"
                      ></v-file-input>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="save">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
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
      <template v-slot:expanded-row="{ columns, item }">
        <tr>
          <td :colspan="columns.length">More info about {{ item.name }}</td>
        </tr>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon size="small" class="me-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    expanded: [],
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        title: "Process",
        align: "start",
        sortable: false,
        key: "name",
      },
      { title: "Roasted", key: "roasted" },
      { title: "Picture", key: "picture" },
      //{ title: 'Description', key: 'description' },
      { title: "Description", key: "data-table-expand" },
      { title: "Actions", key: "actions", sortable: false },
    ],
    process: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      roasted: "",
      picture: "",
    },
    defaultItem: {
      name: "",
      roasted: "",
      picture: "",
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
    this.initialize();
  },

  methods: {
    initialize() {
      this.process = [
        {
          name: "Wet process",
          roasted: "Light roasted",
          picture: " ",
          description: " ",
        },
        {
          name: "Wet process",
          roasted: "Medium roasted",
        },
        {
          name: "Wet process",
          roasted: "Dark roasted",
        },
        {
          name: "Dry process",
          roasted: "Light roasted",
        },
        {
          name: "Dry process",
          roasted: "Medium roasted",
        },
        {
          name: "Dry process",
          roasted: "Dark roasted",
        },
        {
          name: "Honey process",
          roasted: "Light roasted",
        },
        {
          name: "Honey process",
          roasted: "Medium roasted",
        },
        {
          name: "Honey process",
          roasted: "Dark roasted",
        },
      ];
    },

    editItem(item) {
      this.editedIndex = this.process.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.process.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.process.splice(this.editedIndex, 1);
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

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.process[this.editedIndex], this.editedItem);
      } else {
        this.process.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
