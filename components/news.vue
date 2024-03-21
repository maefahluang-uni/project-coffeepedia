<template>
  <v-img :height="490" aspect-ratio="16/9" cover src="@/assets/news_main.jpg">
    <div
      class="d-flex flex-column fill-height justify-end align-start text-white ml-10"
    >
      <h1 class="mb-4">
        What is the market situation for 'Thai coffee' at the beginning of 2023?
      </h1>
      <a
        href="https://www.thansettakij.com/sustainable/food-security/569628/"
        class="subheading mb-4 text-grey"
        >Read More</a
      >
    </div>
  </v-img>
  <v-row class="justify-center mb-5 mt-5 d-flex blog-line">
    <v-card flat class="px-2">
      <h1 class="text-brown blog-head">Lastest News</h1>
    </v-card>
    <v-divider color="black" class="divider"></v-divider>
  </v-row>

  <div class="d-flex justify-center mx-2">
    <div v-if="news.length == 0" class="d-flex">
      <v-skeleton-loader
        :elevation="5"
        type="article"
        width="300"
        class="mb-7"
      ></v-skeleton-loader>
    </div>
    <v-data-iterator v-else :items="news" :items-per-page="itemPerPage"
      ><template v-slot:default="{ items }">
        <v-card
          v-for="(news, index) in items"
          class="mb-7 d-flex elevation-5"
          height="150"
          max-width="700"
          @click="openLink(news.raw.href)"
          color="#F1F1F1"
        >
          <div class="d-flex">
            <v-img
              class="d-flex"
              max-width="200"
              min-width="200"
              cover
              :src="news.raw.newsImageUrl"
            />
            <div>
              <p class="blog-title mt-2">
                {{ news.raw.title }}
              </p>
              <div
                class="text-grey blog-subtitle text-decoration-underline mt-2 mx-5"
              >
                read more
              </div>
            </div>
          </div>
        </v-card> </template
      ><template v-if="showSeeMore" v-slot:footer="{}">
        <div class="d-flex mb-7 justify-center">
          <v-btn variant="outlined" @click="seeMore(4)"> See more </v-btn>
        </div>
      </template></v-data-iterator
    >
  </div>
</template>
<script>
import axios from "axios";
import config from "../config.js";
const api = config.LOCAL_API_URL;

export default {
  data() {
    return {
      itemPerPage: 4,
      showSeeMore: false,
      news: [],
    };
  },
  mounted() {
    this.getAllNews();
  },
  methods: {
    async retryAfterDelay(apiCall) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await apiCall();
    },
    async getAllNews() {
      try {
        const newsResponse = await axios.get(api + "/news", {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });
        this.news = newsResponse.data.response;
        this.showSeeMore = true;
        if (this.itemPerPage >= this.news.length) {
          this.showSeeMore = false;
        }
      } catch (error) {
        console.error("Error fetching all news:", error);
        await this.retryAfterDelay(this.getAllNews());
      }
    },
    seeMore(plusNum) {
      if (this.itemPerPage <= this.news.length - 1) {
        this.itemPerPage += plusNum;
        if (this.itemPerPage >= this.news.length - 1) {
          this.showSeeMore = false;
        }
      }
    },
    openLink(link) {
      window.open(link, "_blank"); // Open link in a new tab
    },
  },
  watch: {},
};
</script>
