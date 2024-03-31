<template>
  <div v-for="(table, index) in tables">
    <v-data-table
      :headers="table.headers"
      :items="table.data"
      :sort-by="[{ key: table.headers[0].title }]"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title
            ><h4>{{ table.headers[0].title }} Coffee Bean</h4>
          </v-toolbar-title>
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
                @click="
                  (selecting = table.headers[0].title),
                    (tableIndex = this.tables.indexOf(table))
                "
              >
                <v-icon icon="mdi-plus" color="green"></v-icon>
                Add {{ table.headers[0].title }}
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="editedItem.name"
                        :label="selecting"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="close()">
                  Cancel
                </v-btn>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="save(tableIndex)"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="d-flex justify-space-evenly">
          <v-icon
            class="pr-2"
            size="small"
            @click="
              editItem(item, this.tables.indexOf(table)),
                (selecting = table.headers[0].title),
                (tableIndex = this.tables.indexOf(table))
            "
          >
            mdi-pencil
          </v-icon>
          <v-icon size="small"> mdi-eye </v-icon>
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    selecting: "",
    tableIndex: "",
    editedIndex: -1,
    editedItem: {
      name: "",
    },
    defaultItem: {
      name: "",
    },
    tables: [],
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Process" : "Edit Process";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    selecting(val) {
      this.selecting = val;
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.tables = [
        {
          data: [
            {
              name: "Dry",
            },
            {
              name: "Wet",
            },
            {
              name: "Honey",
            },
          ],
          headers: [
            {
              title: "Process",
              align: "center",
              sortable: false,
              key: "name",
            },
            { title: "Edit", align: "center", key: "actions", sortable: false },
          ],
        },
      ];
    },

    editItem(item, index) {
      this.editedIndex = this.tables[index].data.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save(tableIndex) {
      if (this.editedIndex > -1) {
        Object.assign(
          this.tables[tableIndex].data[this.editedIndex],
          this.editedItem
        );
      } else {
        this.tables[tableIndex].data.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>
