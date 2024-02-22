<template>
  <div><v-divider> </v-divider></div>
  <div class="d-flex justify-center mt-15">
    <h1>A database system's</h1>
    <h1 class="ml-2 text-brown">classification of</h1>
  </div>
  <div class="d-flex justify-center">
    <h1>roasted coffee bean</h1>
  </div>
  <div class="d-flex justify-center mt-15">
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
            <h3 class="d-flex justify-end mt-3 mr-15 text-black">9</h3>
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
            <h3 class="d-flex justify-end mt-3 mr-15 text-black">3</h3>
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
            <h3 class="d-flex justify-end mt-3 mr-15 text-black">4</h3>
          </v-card-text>
        </v-row>
      </v-card-item>
      <v-card-text>
        <h5 class="ml-15 text-black">News</h5>
      </v-card-text>
    </v-card>
  </div>
  <v-spacer class="mt-10"></v-spacer>
</template>
