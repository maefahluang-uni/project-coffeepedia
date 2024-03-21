<template>
  <v-img :height="490" aspect-ratio="16/9" cover src="@/assets/news_main.jpg">
    <!--<div
      class="d-flex flex-column fill-height justify-end align-start text-white ml-10"
    >
      <h1 class="mb-4">
        News
      </h1>
    </div>-->
  </v-img>

  <div class="d-flex flex-column align-start mt-10 ml-16">
    <h1 class="text-brown">Lastest</h1>
  </div>
  <div class="mx-16 mt-5 mb-5"><v-divider></v-divider></div>

  <v-row class="d-flex justify-space-evenly">
    <div>
      <v-card
        class="my-12"
        max-width="300"
        max-height="600"
        color="rgba(60, 60, 60, 0.2)"
      >
        <v-img cover height="300" src="@/assets/news1.jpg"></v-img>

        <v-card-item>
          <v-card-subtitle class="ml-4"> July 15, 2023 </v-card-subtitle>
          <v-card-text>
            <div class="text-h6">
              Point out the direction in which the Thai coffee industry can
              develop and be sustainable
            </div>
          </v-card-text>
        </v-card-item>
        <div>
          <a
            href="https://www.thairath.co.th/lifestyle/life/2709619"
            class="subheading mb-4 text-grey d-flex justify-end align-end mr-5"
            >Read More</a
          >
        </div>
      </v-card>
    </div>

    <div>
      <v-card
        class="mx-auto my-12"
        max-width="300"
        color="rgba(60, 60, 60, 0.2)"
      >
        <v-img cover height="300" src="@/assets/news3.jpg"></v-img>

        <v-card-item>
          <v-card-subtitle class="ml-4"> July 11, 2023 </v-card-subtitle>
          <v-card-text>
            <div class="text-h6">
              Thai people consume 70,000 tons of coffee per year, pushing the
              market value to reach 60 billion
            </div>
          </v-card-text>
        </v-card-item>
        <div>
          <a
            href="https://www.dailynews.co.th/news/2053626/"
            class="subheading mb-4 text-grey d-flex justify-end align-end mr-5"
            >Read More</a
          >
        </div>
      </v-card>
    </div>
  </v-row>
  <v-row class="d-flex justify-space-evenly">
    <div>
      <v-card
        class="my-12"
        max-width="300"
        max-height="600"
        color="rgba(60, 60, 60, 0.2)"
      >
        <v-img cover height="300" src="@/assets/news2.jpg"></v-img>

        <v-card-item>
          <v-card-subtitle class="ml-4"> Jan 15, 2023 </v-card-subtitle>
          <v-card-text>
            <div class="text-h6">
              Revealing the reason why Thai people drink expensive 'coffee'
            </div>
          </v-card-text>
        </v-card-item>
        <v-spacer></v-spacer>
        <div>
          <a
            href="https://today.line.me/th/v2/article/kEZqkG1"
            class="subheading mb-4 text-grey d-flex justify-end align-end mr-5"
            >Read More</a
          >
        </div>
      </v-card>
    </div>

    <div>
      <v-card
        class="mx-auto my-12"
        max-width="300"
        color="rgba(60, 60, 60, 0.2)"
      >
        <v-img cover height="300" src="@/assets/news4.jpg"></v-img>

        <v-card-item>
          <v-card-subtitle class="ml-4"> Dec 10, 2022 </v-card-subtitle>
          <v-card-text>
            <div class="text-h6">
              Get to know espresso A menu that is more than just black coffee.
            </div>
          </v-card-text>
        </v-card-item>
        <div>
          <a
            href="https://www.thairath.co.th/lifestyle/life/2290026"
            class="subheading mb-4 text-grey d-flex justify-end align-end mr-5"
            >Read More</a
          >
        </div>
      </v-card>
    </div>
  </v-row>
</template>
<script>
import axios from "axios";
import config from "../config.js";
const api = config.LOCAL_API_URL;

export default {
  data: () => {},
  mounted() {},
  methods: {},
  watch: {},
};
</script>
