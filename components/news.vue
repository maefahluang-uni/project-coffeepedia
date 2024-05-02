<template>
  <v-img aspect-ratio="16/9" cover src="@/assets/news_main.jpg" class="banner">
  </v-img>
  <v-row class="justify-center mb-5 mt-5 d-flex blog-line">
    <v-card flat class="px-2">
      <h1 class="text-brown blog-head">Lastest News</h1>
    </v-card>
    <v-divider color="black" class="divider"></v-divider>
  </v-row>

  <div class="d-flex mx-2 mb-7 justify-space-evenly">
    <div v-if="news.length == 0" class="wrap">
      <v-skeleton-loader
        v-for="n in 3"
        :elevation="5"
        type="article"
        width="200"
        class="mb-7 mx-4"
      ></v-skeleton-loader>
    </div>
    <v-data-iterator v-else :items="news" :items-per-page="itemPerPage">
      <template v-slot:default="{ items }">
        <div
          class="d-flex align-content-space-around flex-wrap justify-space-around"
        >
          <v-card
            v-for="(news, index) in items"
            class="ma-3 elevation-5 d-flex flex-column"
            width="400"
            @click="openLink(news.raw.href)"
            color="#F1F1F1"
          >
            <v-img cover :src="news.raw.newsImageUrl" max-height="200" />

            <p class="blog-title mt-2 mb-auto">
              {{ news.raw.title }}
            </p>
            <div
              class="text-grey text-end blog-subtitle text-decoration-underline mb-2 mx-5"
            >
              read more
            </div>
          </v-card>
        </div>
      </template>
      <template v-if="showSeeMore" v-slot:footer="{}">
        <div class="d-flex mb-7 justify-center mt-10">
          <v-btn variant="outlined" @click="seeMore(4)"> See more </v-btn>
        </div>
      </template>
    </v-data-iterator>
  </div>
</template>
<script>
import axios from "axios";
import config from "../config.js";
const api = config.LOCAL_API_URL;
const apiKey = config.API_KEY;
const apiHaders = { "ngrok-skip-browser-warning": "true", "api-key": apiKey };
export default {
  data() {
    return {
      itemPerPage: 4,
      showSeeMore: false,
      news: [],
    };
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
        const newsResponse = await axios.get(api + "api/news", {
          headers: apiHaders,
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
<style>
:root {
  --banner-height: 40vh;
}

@media (min-width: 601px) {
  .banner {
    height: 450px;
  }
  .wrap {
    display: contents;
  }
}
</style>
