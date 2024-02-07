<template>
  <v-app-bar elevation="0">
    <v-row justify="space-between">
      <div class="d-none d-sm-flex">
        <v-col cols="3" class="ml-10">
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
        <v-col cols="3">
          <div class="d-inline-flex">
            <v-img
              height="50"
              width="150"
              src="@/assets/blackloco1.png"
              class="mt-2 mb-2"
            />

            <v-img
              height="30"
              width="150"
              src="@/assets/blackloco2.png"
              class="mt-4"
            />
          </div>
          <v-spacer />
        </v-col>
      </div>

      <div class="d-none d-sm-flex">
        <v-col align="end" align-self="center" class="mr-15">
          <v-btn class="mr-5" icon="mdi-magnify" size="35" color="#39150E" />
          <v-btn class="mr-5" size="35" color="#39150E" rounded> EN</v-btn>
          <v-btn class="" icon="mdi-account" size="35" color="#39150E" />
        </v-col>
      </div>

      <div class="d-flex d-sm-none">
        <v-col align="end" align-self="center">
          <v-btn class="mr-5" icon="mdi-menu" size="35" color="#39150E" />
        </v-col>
      </div>
    </v-row>
  </v-app-bar>
</template>

<script></script>
<style></style>
