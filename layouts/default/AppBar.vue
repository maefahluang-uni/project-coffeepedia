<template>
  <v-app-bar elevation="0">
    <v-row justify="space-between">
      <div class="d-none d-sm-flex">
        <v-col cols="3" class="ml-5">
          <div class="d-inline-flex">
            <v-img
              height="50"
              width="150"
              src="@/assets/blackloco1.png"
              class="ma-2"
            />

            <v-img
              height="30"
              width="150"
              src="@/assets/blackloco2.png"
              class="ma-2 mt-4"
            />
          </div>
        </v-col>
      </div>

      <div class="d-flex d-sm-none">
        <div class="d-inline-flex">
          <v-img
            height="37"
            width="120"
            src="@/assets/blackloco1.png"
            class="mt-2 mb-2"
          />

          <v-img
            height="25"
            width="110"
            src="@/assets/blackloco2.png"
            class="mt-3 ml-1"
          />
        </div>
        <v-spacer />
      </div>

      <div class="d-none d-sm-flex">
        <v-col align="end" align-self="center" class="mr-10">
          <v-btn class="mr-5" icon="mdi-magnify" size="35" color="#39150E" />
          <v-btn
            class="mr-5"
            size="35"
            color="#39150E"
            rounded
            @click="changeLanguage()"
          >
            {{ language }}</v-btn
          >
          <v-btn class="" icon="mdi-account" size="35" color="#39150E" />
        </v-col>
      </div>

      <div class="d-flex d-sm-none">
        <v-col align="end" align-self="center">
          <v-btn
            class="mr-5"
            icon="mdi-menu"
            size="35"
            color="#39150E"
            @click="overlay = !overlay"
          />
        </v-col>
      </div>
    </v-row>
  </v-app-bar>
  <v-navigation-drawer v-model="overlay" location="right" temporary>
    <v-list>
      <v-list-item
        prepend-icon="mdi-magnify"
        title="Search"
        value="search"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account"
        title="Admin account"
        value="account"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-translate"
        :title="language"
        value="language"
        @click="changeLanguage()"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: () => ({
    overlay: false,
    language: "EN",
  }),
  methods: {
    changeLanguage() {
      this.language = this.language === "EN" ? "TH" : "EN";
    },
  },

  watch: {},
};
</script>
<style></style>
