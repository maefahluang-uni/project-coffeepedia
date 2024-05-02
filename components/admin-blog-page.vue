<template>
  <div class="d-flex justify-center my-10">
    <v-card class="card-table elevation-10">
      <v-data-table
        :headers="headers"
        :items="blogs"
        :sort-by="[{ key: 'Title', order: 'asc' }]"
        item-value="id"
        :loading="blogs.length == 0"
        ><template v-slot:loading>
          <v-skeleton-loader
            type="table-row-divider@6"
          ></v-skeleton-loader> </template
        ><template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title><h4>Blogs</h4></v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer
            ><v-btn
              color="green"
              variant="tonal"
              rounded="xl"
              @click="dialog = !dialog"
            >
              <v-icon icon="mdi-plus" color="green"></v-icon>
              Add Blog
            </v-btn>

            <v-dialog v-model="dialog" max-width="700px">
              <v-form ref="form">
                <v-card>
                  <v-container>
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
                      v-model="editedItem.imageURL"
                      label="Image URL*"
                      :rules="rules.requireInput('Image URL')"
                    ></v-text-field>

                    <div class="mt-6 mb-2 d-flex justify-space-between">
                      <div>
                        <v-btn
                          variant="text"
                          @click="addListItem"
                          icon="mdi-format-list-bulleted"
                        >
                        </v-btn>
                      </div>
                      <div>
                        <v-btn
                          @click="alignLeft"
                          rounded="0"
                          icon="mdi-format-align-left"
                        ></v-btn>
                        <v-btn
                          @click="alignCenter"
                          rounded="0"
                          icon="mdi-format-align-center"
                        ></v-btn>
                        <v-btn
                          @click="alignRight"
                          rounded="0"
                          icon="mdi-format-align-right"
                        ></v-btn>
                      </div>
                    </div>

                    <v-card flat>
                      <div
                        placeholder="Type something..."
                        class="pa-5"
                        contenteditable="true"
                        v-html="editedItem.content"
                        ref="editableDiv"
                        @input="updateToggleState"
                        @click="updateToggleState"
                        @keyup="updateToggleState"
                      ></div>
                    </v-card>
                    <v-card-actions class="mb-2">
                      <v-spacer></v-spacer>
                      <v-btn color="gray" variant="tonal" @click="close">
                        Cancel
                      </v-btn>
                      <v-btn color="#6AC479" variant="elevated" @click="save">
                        <div class="font-weight-bold text-white">Save</div>
                      </v-btn>
                    </v-card-actions>
                  </v-container>
                </v-card>
              </v-form>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.title="{ item }">
          <p class="news-title">{{ item.title }}</p>
        </template>
        <template v-slot:item.image="{ item }">
          <div class="d-flex align-center">
            <img :src="item.imageURL" width="100" aspect-ratio="1/1" />
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
            @click="toggleblogs(item.ID, item)"
          ></v-switch>
        </template>

        <template v-slot:no-data>
          <v-btn color="primary" @click="getAllBlogs"> Reset </v-btn>
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
    blogs: [],
    isibleDialog: true,
    dialog: false,
    dialogDelete: false,
    htmlContent: "",

    headers: [
      {
        title: "Title",
        key: "title",
      },
      { title: "Image", key: "image", sortable: false },
      { title: "Views", key: "viewCount" },
      { title: "Comments", key: "commentCount" },
      { title: "Edit", key: "actions", sortable: false, align: "end" },
      { title: "Status", key: "actions2", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      ID: "",
      title: "",
      date: "",
      viewCount: "",
      commentCount: "",
      content: "",
      imageURL: "",
      IsActivate: "1",
    },
    defaultItem: {
      ID: "",
      title: "",
      date: "",
      viewCount: "",
      commentCount: "",
      content: "",
      imageURL: "",
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
      return this.editedIndex === -1 ? "Add Blog" : "Edit Blog";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    blogs(val) {
      this.blogs = val;
    },
    htmlContent(val) {
      this.htmlContent = val;
    },
  },

  created() {
    this.getAllBlogs();
  },
  methods: {
    async retryAfterDelay(apiCall) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await apiCall();
    },
    async getAllBlogs() {
      try {
        const blogresponse = await axios.get(api + "api/blogs?admin=true", {
          headers: apiHaders,
        });

        this.blogs = blogresponse.data.response;
        console.log(this.blogs);
      } catch (error) {
        console.error("Error fetching all blogs:", error);
        await this.retryAfterDelay(this.getAllBlogs());
      }
    },
    async toggleblogs(id, blog) {
      let index = this.blogs.indexOf(blog);
      let isactivateNumChange =
        this.blogs[index].IsActivate === "1" ? "0" : "1";
      let editblogs = {
        ID: id,
        IsActivate: isactivateNumChange,
      };
      this.blogs[index].iconLoading = true;

      try {
        const res = await axios.post(api + "api/blogs/?edit=true", editblogs, {
          headers: apiHaders,
        });
        if (res.data.status == 200) {
          this.blogs[index].IsActivate = isactivateNumChange;
          this.blogs[index].iconLoading = false;
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
      this.editedIndex = this.blogs.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    activateItem(item) {
      this.editedIndex = this.blogs.indexOf(item);
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
      this.saveContent();
      if (!valid) {
        return;
      }

      if (this.editedIndex > -1) {
        const sentItem = {
          ID: this.editedItem.ID,
          title: this.editedItem.title,
          date: nowDateTime,
          content: this.editedItem.content,
          imageURL: this.editedItem.imageURL,
        };
        try {
          const res = await axios.post(api + "api/blogs?edit=true", sentItem, {
            headers: apiHaders,
          });
          console.log(res);
          if (res.data.status == 200) {
            Object.assign(this.blogs[this.editedIndex], this.editedItem);
          }
        } catch (error) {
          console.error("Error update blogs:", error);
        }
      } else {
        const sentItem = {
          title: this.editedItem.title,
          date: nowDateTime,
          content: this.editedItem.content,
          imageURL: this.editedItem.imageURL,
        };

        try {
          const res = await axios.post(
            api + "api/blogs?insert=true",
            sentItem,
            {
              headers: apiHaders,
            }
          );
          if (res.data.status == 200) {
            this.editedItem.ID = res.data.response.insertId;
            this.blogs.push(this.editedItem);
          }
        } catch (error) {
          console.error("Error update blogs:", error);
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

    saveContent() {
      this.editedItem.content = this.$refs.editableDiv.innerHTML;
    },

    alignLeft() {
      document.execCommand("justifyLeft", false, null); // Align selected text to the left
      this.saveContent();
    },
    alignCenter() {
      document.execCommand("justifyCenter", false, null); // Align selected text to the center
      this.saveContent();
    },
    alignRight() {
      document.execCommand("justifyRight", false, null); // Align selected text to the right
      this.saveContent();
    },

    addListItem() {
      document.execCommand("insertHTML", false, "<li></li>"); // Insert <li> tag
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
[placeholder]:empty::before {
  content: attr(placeholder);
  color: #555;
}

[placeholder]:empty:focus::before {
  content: "";
}
</style>
