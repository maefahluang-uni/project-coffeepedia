<template>
  <v-container>
    <head>
      <title>HomePage</title>
    </head>
    <div>
      <div>
        <v-parallax src="@/assets/coffeeHome.jpg">
          <div>
            <v-divider color="brown"> </v-divider>
            <v-card>
              <v-tabs
                v-model="tab"
                color="rgb(240, 200, 165)"
                align-tabs="center"
              >
                <v-tab :value="1">Home</v-tab>
                <v-tab :value="2">Type coffee beans</v-tab>
                <v-tab :value="3">Blog</v-tab>
                <v-tab :value="4">News</v-tab>
                <v-tab :value="5">Contact</v-tab>
              </v-tabs>
            </v-card>
          </div>
          <div>
            <v-col>
              <v-card
                title="Location"
                subtitle="Coffee bean locations in the North"
                class="mx-auto"
                max-width="1440"
                color="rgba(240, 200, 80, 0.2)"
              >
                <v-img height="200" src="@/assets/location.gif" />
                <v-card-actions>
                  <v-col cols="4" sm="6" md="4">
                    <v-btn
                      color="rgb(140, 115, 70)"
                      height="25"
                      width="120"
                      variant="elevated"
                      rounded="xl"
                      >View All</v-btn
                    >
                  </v-col>
                </v-card-actions>
              </v-card>
            </v-col>
          </div>
          <div
            class="d-flex flex-column fill-height justify-center align-center text-black"
          >
            <h1 class="text-h4 font-weight-thin mb-4">Vuetify</h1>
            <h4 class="subheading">Build your application today!</h4>
          </div>
        </v-parallax>
      </div>
    </div>
  </v-container>
</template>

<style>
/* body {
            background-image: url("https://img.freepik.com/free-photo/scattering-coffee-grains_23-2147896401.jpg?w=1800&t=st=1706551933~exp=1706552533~hmac=fb197b383d384411483e94b82d31a399c33ad6eb3de2c22eae281c400c17dae4");
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
          }*/
</style>

<script>
export default {
  data: () => ({
    tab: null,
  }),
};
</script>
