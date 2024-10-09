<template>
  <div class="d-flex justify-center my-10">
    <v-card class="card-table elevation-10">
      <v-data-table
        :headers="headers"
        :items="news"
        :sort-by="[{ key: 'Title', order: 'asc' }]"
        item-value="id"
        :loading="news.length == 0"
        ><template v-slot:loading>
          <v-skeleton-loader
            type="table-row-divider@6"
          ></v-skeleton-loader> </template
        ><template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title><h4>News</h4></v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer
            ><v-btn
              color="green"
              variant="tonal"
              rounded="xl"
              @click="dialog = !dialog"
            >
              <v-icon icon="mdi-plus" color="green"></v-icon>
              Add News
            </v-btn>

            <v-dialog v-model="dialog" max-width="700px"
              ><v-form ref="form">
                <v-card
                  ><v-container>
                    <v-card-title class="pa-0 mb-4">
                      {{ formTitle }}
                    </v-card-title>
                    <v-text-field
                      class="mb-2"
                      v-model="editedItem.title"
                      label="Title*"
                      :rules="rules.requireInput('Title')"
                    ></v-text-field>
                    <v-text-field
                      class="mb-2"
                      v-model="editedItem.newsImageUrl"
                      label="Image URL*"
                      :rules="rules.requireInput('Image URL')"
                    ></v-text-field
                    ><v-text-field
                      class="mb-2"
                      v-model="editedItem.href"
                      label="href (News source URL)*"
                      :rules="rules.requireInput('News source URL')"
                    ></v-text-field
                    ><v-card-actions class="mb-2">
                      <v-spacer></v-spacer>
                      <v-btn color="gray" variant="tonal" @click="close">
                        Cancel
                      </v-btn>
                      <v-btn color="#6AC479" variant="elevated" @click="save">
                        <div class="font-weight-bold text-white">Save</div>
                      </v-btn>
                    </v-card-actions></v-container
                  ></v-card
                >
              </v-form></v-dialog
            >
          </v-toolbar>
        </template>
        <template v-slot:item.title="{ item }">
          <p class="news-title">{{ item.title }}</p>
        </template>
        <template v-slot:item.newsImageUrl="{ item }">
          <div class="align-center justify-center d-flex">
            <v-icon v-if="!item.newsImageUrl" icon="mdi-image-remove"></v-icon>
            <img v-else :src="item.newsImageUrl" width="100" contain />
          </div>
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
            @click="toggleNews(item.ID, item)"
          ></v-switch>
        </template>

        <template v-slot:no-data>
          <v-btn color="primary" @click="getAllNews"> Reset </v-btn>
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
//const adapter = useDate()
export default {
  data: () => ({
    news: [],
    isibleDialog: true,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        title: "Title",
        key: "title",
      },
      { title: "Image", key: "newsImageUrl", sortable: false },
      { title: "href", key: "href" },
      { title: "Edit", key: "actions", sortable: false, align: "end" },
      { title: "Status", key: "actions2", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      ID: "",
      title: "",
      date: "",
      newsImageUrl: "",
      href: "",
      IsActivate: "1",
    },
    defaultItem: {
      ID: "",
      title: "",
      date: "",
      newsImageUrl: "",
      href: "",
      IsActivate: "1",
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
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Add News" : "Edit News";
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
    this.getAllNews();
  },
  methods: {
    async retryAfterDelay(apiCall) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await apiCall();
    },
    async getAllNews() {
      try {
        const newsResponse = await axios.get(api + "api/news?admin=true", {
          headers: apiHaders,
        });
        this.news = newsResponse.data.response;
      } catch (error) {
        console.error("Error fetching all news:", error);
        await this.retryAfterDelay(this.getAllNews());
      }
    },
    async toggleNews(id, news) {
      let index = this.news.indexOf(news);
      let isactivateNumChange = this.news[index].IsActivate === "1" ? "0" : "1";
      let editnews = {
        ID: id,
        IsActivate: isactivateNumChange,
      };
      this.news[index].iconLoading = true;

      try {
        const res = await axios.post(api + "api/news/?edit=true", editnews, {
          headers: apiHaders,
        });
        if (res.data.status == 200) {
          this.news[index].IsActivate = isactivateNumChange;
          this.news[index].iconLoading = false;
        }
      } catch (error) {
        console.error("Error toggleType:", error);
      }
    },
    formatDateNotime(dateString) {
      const date = new Date(dateString);
      const options = { month: "short", day: "numeric", year: "numeric" };
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        date
      );
      return formattedDate;
    },
    editItem(item) {
      this.editedIndex = this.news.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    activateItem(item) {
      this.editedIndex = this.news.indexOf(item);
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
      const timestamp = Date.now();
      const nowDateTime = this.getDateTime(timestamp);
      if (!valid) {
        return;
      }
      if (this.editedIndex > -1) {
        const sentItem = {
          ID: this.editedItem.ID,
          title: this.editedItem.title,
          date: nowDateTime,
          newsImageUrl: this.editedItem.newsImageUrl,
          href: this.editedItem.href,
        };
        try {
          const res = await axios.post(api + "api/news?edit=true", sentItem, {
            headers: apiHaders,
          });
          console.log(res);
          if (res.data.status == 200) {
            Object.assign(this.news[this.editedIndex], this.editedItem);
          }
        } catch (error) {
          console.error("Error update news:", error);
        }
      } else {
        const sentItem = {
          title: this.editedItem.title,
          date: nowDateTime,
          newsImageUrl: this.editedItem.newsImageUrl,
          href: this.editedItem.href,
        };

        try {
          const res = await axios.post(api + "api/news?insert=true", sentItem, {
            headers: apiHaders,
          });
          if (res.data.status == 200) {
            this.editedItem.ID = res.data.response.insertId;
            this.news.push(this.editedItem);
          }
        } catch (error) {
          console.error("Error update news:", error);
        }
      }
      this.close();
      return;
    },
    getDateTime(timestamp) {
      const nowDateObj = new Date(timestamp);
      // Extract the components of the date object (year, month, day, hour, minute, second)
      const year = nowDateObj.getFullYear();
      const month = String(nowDateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
      const day = String(nowDateObj.getDate()).padStart(2, "0");
      const hours = String(nowDateObj.getHours()).padStart(2, "0");
      const minutes = String(nowDateObj.getMinutes()).padStart(2, "0");
      const seconds = String(nowDateObj.getSeconds()).padStart(2, "0");

      const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      return formattedDateTime;
    },
  },
};
</script>
<style>
.news-title {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
