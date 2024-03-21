<template>
  <div><v-divider></v-divider></div>
  <div>
    <v-data-table
      v-model:expanded="expanded"
      :headers="headers"
      :items="process"
      :sort-by="[{ key: 'Process', order: 'asc' }]"
      item-value="id"
      show-expand
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
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Process"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.roasted"
                      label="Roasted"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.description"
                      label="Description"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-file-input
                      v-slot:item.image="{ item }"
                      v-model="editedItem.picture"
                      accept="image/*"
                      label="Picture"
                    ></v-file-input>
                  </v-col>
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
          <td :colspan="columns.length">
            <ul>
              <li v-for="(hide, index) in item.hides" :key="index">
                {{ hide.hide }}
              </li>
            </ul>
          </td>
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
      { title: "Description", key: "description" },
      { title: "", key: "data-table-expand" },
      { title: "Actions", key: "actions", sortable: false },
    ],
    process: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      roasted: "",
      picture: "",
      description: "",
      hides: "",
    },
    defaultItem: {
      name: "",
      roasted: "",
      picture: "",
      description: "",
      hides: "",
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
          id: 1,
          name: "Wet process",
          roasted: "Light roasted",
          description: "Light (Cinnamon Roast, Half City)",
          hides: [
            {
              hide: "Light (Cinnamon Roast, Half City)",
            },
            {
              hide: "199-205  °C",
            },
            {
              hide: "Gas 10 when 180 °C",
            },
            {
              hide: "Gas 5 when 195 °C",
            },
            {
              hide: "1st crack",
            },
            {
              hide: "Dry",
            },
            {
              hide: "Light-bodied and somewhat sour, grassy, and snappy",
            },
            {
              hide: "Suitable for brewing Filter",
            },
          ],
        },
        {
          id: 2,
          name: "Wet process",
          roasted: "Medium roasted",
          description: "Medium(Full City, Regular)",
          hides: [
            {
              hide: "Medium(Full City, Regular)",
            },
            {
              hide: "215-218  °C",
            },
            {
              hide: "Gas 10 when 180 °C ",
            },
            {
              hide: "Gas 5 when 195 °C",
            },
            {
              hide: "Between 1st and 2nd crack",
            },
            {
              hide: "Dry",
            },
            {
              hide: "A bit sweeter than light roast; full body balanced by acid snap, aroma, and complexity",
            },
            {
              hide: "Suitable for brewing Filter and Espresso",
            },
          ],
        },
        {
          id: 3,
          name: "Wet process",
          roasted: "Dark roasted",
          description: "Dark(Italian Espresso, Viennese)",
          hides: [
            {
              hide: "Dark(Italian Espresso, Viennese)",
            },
            {
              hide: "225-245  °C",
            },
            {
              hide: "Gas 10 when 180 °C ",
            },
            {
              hide: "Gas 5 when 195 °C",
            },
            {
              hide: "2nd crack",
            },
            {
              hide: "Slightly shiny",
            },
            {
              hide: "Somewhat spicy; complexity is traded for a rich chocolaty body. aroma is exchanged for sweetness",
            },
            {
              hide: "Suitable for brewing with Espresso machines and making coffee with milk",
            },
          ],
        },
        {
          id: 4,
          name: "Dry process",
          roasted: "Light roasted",
          description: "Light (Cinnamon Roast, Half City)",
          hides: [
            {
              hide: "Light (Cinnamon Roast, Half City)",
            },
            {
              hide: "199-205  °C",
            },
            {
              hide: "Gas 10 when 180 °C",
            },
            {
              hide: "Gas 5 when 195 °C",
            },
            {
              hide: "1st crack",
            },
            {
              hide: "Dry",
            },
            {
              hide: "Light-bodied and somewhat sour, grassy, and snappy",
            },
            {
              hide: "Suitable for brewing Filter",
            },
          ],
        },
        {
          id: 5,
          name: "Dry process",
          roasted: "Medium roasted",
          description: "Medium(Full City, Regular)",
          hides: [
            {
              hide: "Medium(Full City, Regular)",
            },
            {
              hide: "215-218  °C",
            },
            {
              hide: "Gas 10 when 180 °C ",
            },
            {
              hide: "Gas 5 when 195 °C",
            },
            {
              hide: "Between 1st and 2nd crack",
            },
            {
              hide: "Dry",
            },
            {
              hide: "A bit sweeter than light roast; full body balanced by acid snap, aroma, and complexity",
            },
            {
              hide: "Suitable for brewing Filter and Espresso",
            },
          ],
        },
        {
          id: 6,
          name: "Dry process",
          roasted: "Dark roasted",
          description: "Dark(Italian Espresso, Viennese)",
          hides: [
            {
              hide: "Dark(Italian Espresso, Viennese)",
            },
            {
              hide: "225-245  °C",
            },
            {
              hide: "Gas 10 when 180 °C ",
            },
            {
              hide: "Gas 5 when 195 °C",
            },
            {
              hide: "2nd crack",
            },
            {
              hide: "Slightly shiny",
            },
            {
              hide: "Somewhat spicy; complexity is traded for a rich chocolaty body. aroma is exchanged for sweetness",
            },
            {
              hide: "Suitable for brewing with Espresso machines and making coffee with milk",
            },
          ],
        },
        {
          id: 7,
          name: "Honey process",
          roasted: "Light roasted",
          description: "Light (Cinnamon Roast, Half City)",
          hides: [
            {
              hide: "Light (Cinnamon Roast, Half City)",
            },
            {
              hide: "199-205  °C",
            },
            {
              hide: "Gas 10 when 180 °C",
            },
            {
              hide: "Gas 5 when 195 °C",
            },
            {
              hide: "1st crack",
            },
            {
              hide: "Dry",
            },
            {
              hide: "Light-bodied and somewhat sour, grassy, and snappy",
            },
            {
              hide: "Suitable for brewing Filter",
            },
          ],
        },
        {
          id: 8,
          name: "Honey process",
          roasted: "Medium roasted",
          description: "Medium(Full City, Regular)",
          hides: [
            {
              hide: "Medium(Full City, Regular)",
            },
            {
              hide: "215-218  °C",
            },
            {
              hide: "Gas 10 when 180 °C ",
            },
            {
              hide: "Gas 5 when 195 °C",
            },
            {
              hide: "Between 1st and 2nd crack",
            },
            {
              hide: "Dry",
            },
            {
              hide: "A bit sweeter than light roast; full body balanced by acid snap, aroma, and complexity",
            },
            {
              hide: "Suitable for brewing Filter and Espresso",
            },
          ],
        },
        {
          id: 9,
          name: "Honey process",
          roasted: "Dark roasted",
          description: "Dark(Italian Espresso, Viennese)",
          hides: [
            {
              hide: "Dark(Italian Espresso, Viennese)",
            },
            {
              hide: "225-245  °C",
            },
            {
              hide: "Gas 10 when 180 °C ",
            },
            {
              hide: "Gas 5 when 195 °C",
            },
            {
              hide: "2nd crack",
            },
            {
              hide: "Slightly shiny",
            },
            {
              hide: "Somewhat spicy; complexity is traded for a rich chocolaty body. aroma is exchanged for sweetness",
            },
            {
              hide: "Suitable for brewing with Espresso machines and making coffee with milk",
            },
          ],
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
