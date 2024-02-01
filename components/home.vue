<template>
  <v-parallax src="@/assets/coffeeHome.jpg">
    <v-card class="mx-auto" color="rgba(200, 176, 153, 0.7)">
      <v-row>
        <v-col align-self="center">
          <div class="d-flex justify-end">
            <v-img
              height="50"
              max-width="50"
              src="@/assets/location-no-bg.gif"
              class=""
            />
            <div>
              <div class="text-h3">
                <h3>Location</h3>
              </div>

              <p class="ml-1 mb-10 mt-2 font-weight-bold">
                Coffee bean location in the north of Thailand
              </p>
              <v-btn
                color="rgb(140, 115, 70)"
                height="25"
                width="120"
                variant="elevated"
                rounded="xl"
                >View All</v-btn
              >
            </div>
          </div>
        </v-col>

        <v-col align-self="center">
          <div class="justify-end">
            <v-img width="200" src="@/assets/logo.png" />
          </div>
        </v-col>
      </v-row>
    </v-card>
    <div
      class="d-flex flex-column fill-height justify-center align-center text-black"
    >
      <h1 class="text-h4 font-weight-thin mb-4">Vuetify</h1>
      <h4 class="subheading">Build your application today!</h4>
    </div>
  </v-parallax>
</template>
