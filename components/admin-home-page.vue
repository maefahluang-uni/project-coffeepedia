<template>
  <div class="d-flex justify-center mt-15">
    <h1>A database system's</h1>
    <h1 class="ml-2 text-brown">classification of</h1>
  </div>
  <div class="d-flex justify-center">
    <h1>roasted coffee bean</h1>
  </div>
  <div class="d-flex mt-15 justify-center">
    <div>
      <div>
        <v-card
          rounded="xl"
          height="110"
          width="300"
          color="rgba(180, 130, 60, 0.5)"
        >
          <v-card-item>
            <v-row class="mt-2">
              <v-img
                class="ml-10"
                height="50"
                width="50"
                src="@/assets/admin-home-coffee.png"
              >
              </v-img>
              <v-card-text>
                <h3 class="d-flex justify-end mt-3 mr-15 text-black">
                  {{ typeCount }}
                </h3>
              </v-card-text>
            </v-row>
          </v-card-item>
          <v-card-text>
            <h5 class="ml-5 text-black">Type coffee beans</h5>
          </v-card-text>
        </v-card>
      </div>
      <div class="d-flex justify-center mt-5">
        <v-card
          rounded="xl"
          height="110"
          width="300"
          color="rgba(180, 130, 60, 0.5)"
        >
          <v-card-item>
            <v-row class="mt-2">
              <v-img
                class="ml-10"
                height="50"
                width="50"
                src="@/assets/admin-home-blog.png"
              >
              </v-img>
              <v-card-text>
                <h3 class="d-flex justify-end mt-3 mr-15 text-black">
                  {{ blogCount }}
                </h3>
              </v-card-text>
            </v-row>
          </v-card-item>
          <v-card-text>
            <h5 class="ml-15 text-black">Blog</h5>
          </v-card-text>
        </v-card>
      </div>
      <div class="d-flex justify-center mt-5">
        <v-card
          rounded="xl"
          height="110"
          width="300"
          color="rgba(180, 130, 60, 0.5)"
        >
          <v-card-item>
            <v-row class="mt-2">
              <v-img
                class="ml-10"
                height="50"
                width="50"
                src="@/assets/admin-home-news.png"
              >
              </v-img>
              <v-card-text>
                <h3 class="d-flex justify-end mt-3 mr-15 text-black">
                  {{ newsCount }}
                </h3>
              </v-card-text>
            </v-row>
          </v-card-item>
          <v-card-text>
            <h5 class="ml-15 text-black">News</h5>
          </v-card-text>
        </v-card>
      </div>
    </div>

    <v-divider vertical class="mx-10 border-opacity-100"></v-divider>
    <div class="align-start d-flex">
      <h1>Today</h1>
    </div>
    <div class="align-center d-flex">
      <div>
        <div>
          <v-card
            rounded="xl"
            height="110"
            width="300"
            color="rgba(180, 130, 60, 0.5)"
          >
            <v-card-item>
              <v-row class="mt-2">
                <v-img
                  class="ml-10"
                  height="50"
                  width="50"
                  src="@/assets/admin-home-guest.png"
                >
                </v-img>
                <v-card-text>
                  <h3 class="d-flex justify-end mt-3 mr-15 text-black">
                    {{ guestCount }}
                  </h3>
                </v-card-text>
              </v-row>
            </v-card-item>
            <v-card-text>
              <h5 class="ml-15 text-black">Guest</h5>
            </v-card-text>
          </v-card>
        </div>
        <div class="mt-5">
          <v-card
            rounded="xl"
            height="110"
            width="300"
            color="rgba(180, 130, 60, 0.5)"
          >
            <v-card-item>
              <v-row class="mt-2">
                <v-img
                  class="ml-10"
                  height="50"
                  width="50"
                  src="@/assets/admin-home-comment.png"
                >
                </v-img>
                <v-card-text>
                  <h3 class="d-flex justify-end mt-3 mr-15 text-black">
                    {{ commentCount }}
                  </h3>
                </v-card-text>
              </v-row>
            </v-card-item>
            <v-card-text>
              <h5 class="ml-12 text-black">Comment</h5>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>
  </div>
  <v-spacer class="mt-10"></v-spacer>
</template>
<script>
import axios from "axios";
import config from "../config.js";
const api = config.LOCAL_API_URL;

export default {
  data: () => ({
    typeCount: 0,
    blogCount: 0,
    newsCount: 0,
    guestCount: 0,
    commentCount: 0,
  }),
  mounted() {
    this.getTypeCount();
    this.getBlogCount();
    this.getNewsCount();
  },
  methods: {
    async retryAfterDelay(apiCall) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await apiCall();
    },
    async getTypeCount() {
      try {
        const countResponse = await axios.get(api + "/coffeetypes/count", {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });

        this.typeCount = countResponse.data.response[0].type_count;
      } catch (error) {
        console.error("Error fetching type count:", error);
        await this.retryAfterDelay(this.getTypeCount);
      }
    },
    async getBlogCount() {
      try {
        const countResponse = await axios.get(api + "/blogs/count", {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });

        this.blogCount = countResponse.data.response[0].blog_count;
      } catch (error) {
        console.error("Error fetching blog count:", error);
        await this.retryAfterDelay(this.getBlogCount);
      }
    },
    async getNewsCount() {
      try {
        const countResponse = await axios.get(api + "/news/count", {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });

        this.newsCount = countResponse.data.response[0].news_count;
      } catch (error) {
        console.error("Error fetching news count:", error);
        await this.retryAfterDelay(this.getNewsCount);
      }
    },
  },
};
</script>
