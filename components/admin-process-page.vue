<template>
  <div
    v-for="(table, index) in tables"
    v-if="tables.length != 0"
    class="d-flex justify-center my-10"
  >
    <v-card class="card-table elevation-10">
      <v-data-table
        :headers="table.headers"
        :items="table.data"
        :sort-by="[{ key: table.headers[0].title }]"
      >
        <template v-slot:top>
          <v-toolbar color="white">
            <v-toolbar-title><h4>Process Coffee Bean</h4> </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer
            ><v-btn
              color="green"
              dark
              class="mb-2"
              v-bind="props"
              variant="tonal"
              rounded="xl"
              @click="(tableIndex = index), (dialog = !dialog)"
            >
              <v-icon icon="mdi-plus" color="green"></v-icon>
              Add Process
            </v-btn>
            <v-dialog v-model="dialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.ProcessName"
                          label="Process"
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
        <template v-slot:item="{ item, index }">
          <tr :class="index % 2 === 0 ? 'even-row' : 'odd-row'">
            <td>
              <p class="news-title text-center">{{ item.ProcessName }}</p>
            </td>
            <td>
              <div class="d-flex justify-end align-center">
                <v-icon
                  size="small"
                  @click="(tableIndex = index), editItem(item, index)"
                >
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
                  @click="toggleProcess(item, index)"
                ></v-switch>
              </div>
            </td>
          </tr>
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
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    selecting: "",
    tableIndex: "",
    eyeIcon: "mdi-eye",
    isHidden: false,
    editedIndex: -1,
    editedItem: {
      ProcessName: "",
      IsActivate: "1",
    },
    defaultItem: {
      ProcessName: "",
      IsActivate: "1",
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
    eyeIcon(val) {
      this.eyeIcon = val;
    },
  },

  created() {
    this.getAllProcess();
  },

  methods: {
    async retryAfterDelay(apiCall) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await apiCall();
    },
    async getAllProcess() {
      try {
        const res = await axios.get(api + "api/coffeetypes/process", {
          headers: apiHaders,
        });
        //Object.assign(res.data.response, { iconLoading: false })
        res.data.response.forEach((element) => {
          let eyeIcon = "mdi-eye";
          if (element.IsActivate == 0) {
            eyeIcon = "mdi-eye-off";
          }
          Object.assign(element, { iconLoading: false });
          Object.assign(element, { eyeIcon });
        });
        let table = {
          data: res.data.response,
          headers: [
            {
              title: "Process",
              align: "center",
              sortable: false,
              key: "ProcessName",
            },
            { title: "Edit", align: "end", key: "actions", sortable: false },
            {
              title: "Status",
              key: "actions2",
              sortable: false,
            },
          ],
        };
        this.tables.push(table);
      } catch (error) {
        console.error("Error fetching all process:", error);
        await this.retryAfterDelay(this.getAllProcess());
      }
    },
    async toggleProcess(item, tableIndex) {
      let eyeIcon = "mdi-eye";
      let dataIndex = this.tables[tableIndex].data.indexOf(item);
      let isactivateNumChange =
        this.tables[tableIndex].data[dataIndex].IsActivate === "1" ? "0" : "1"; // using this to change IsActivate in database

      this.tables[tableIndex].data[dataIndex].iconLoading = true;

      let process = {
        ID: this.tables[tableIndex].data[dataIndex].ID,
        IsActivate: isactivateNumChange,
      };
      try {
        const res = await axios.post(
          api + "api/coffeetypes/process?edit=true",
          process,
          {
            headers: apiHaders,
          }
        );
        if (res.data.status == 200) {
          this.tables[tableIndex].data[dataIndex].IsActivate =
            isactivateNumChange;

          if (isactivateNumChange == 0) {
            eyeIcon = "mdi-eye-off";
          }
          this.tables[tableIndex].data[dataIndex].eyeIcon = eyeIcon;
          this.tables[tableIndex].data[dataIndex].iconLoading = false;
        }
      } catch (error) {
        console.error("Error changeProcessActivate:", error);
      }
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

    async save(tableIndex) {
      if (this.editedIndex > -1) {
        const sentItem = {
          ID: this.editedItem.ID,
          ProcessName: this.editedItem.ProcessName,
        };
        try {
          const res = await axios.post(
            api + "api/coffeetypes/process?edit=true",
            sentItem,
            {
              headers: apiHaders,
            }
          );
          if (res.data.status == 200) {
            Object.assign(
              this.tables[tableIndex].data[this.editedIndex],
              this.editedItem
            );
          }
        } catch (error) {
          console.error("Error update process name:", error);
        }
      } else {
        try {
          const res = await axios.post(
            api + "api/coffeetypes/process?insert=true",
            this.editedItem,
            {
              headers: apiHaders,
            }
          );
          if (res.data.status == 200) {
            Object.assign(this.editedItem, { ID: res.data.response.insertId });
            Object.assign(this.editedItem, { iconLoading: false });
            Object.assign(this.editedItem, { eyeIcon: "mdi-eye" });
            this.tables[tableIndex].data.push(this.editedItem);
          }
        } catch (error) {
          console.error("Error update process name:", error);
        }
      }
      this.close();
    },
  },
};
</script>
