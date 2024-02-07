<template>
  <div class="bg-repeat">
    <v-card class="mx-auto mb-15" color="rgba(200, 176, 153, 0.7)">
      <v-row>
        <v-col align-self="center">
          <!--Show on sx screen 	600px-- -->
          <div class="d-flex d-sm-none justify-center mt-5 mb-5">
            <div>
              <div
                class="d-inline-flex justify-center align-center location ml-n10"
              >
                <img height="50" src="@/assets/location-no-bg.gif" />

                <div class="text-h4">
                  <h4>Location</h4>
                </div>
              </div>

              <p class="mb-8 mt-2 text-center">
                Coffee bean location in the north of Thailand
              </p>
              <v-btn
                color="rgb(140, 115, 70)"
                height="25"
                width="120"
                variant="elevated"
                rounded="xl"
                class="viewbtn ml-n15"
                >View All</v-btn
              >
            </div>
          </div>

          <!--Show on md screen 	960px > < 1280px-->
          <div
            class="d-none d-sm-flex d-md-flex d-lg-none justify-center mt-5 mb-5"
          >
            <div>
              <div
                class="d-inline-flex justify-center align-center location ml-n15"
              >
                <img height="50" src="@/assets/location-no-bg.gif" />

                <div class="text-h2">
                  <h3 class="text-center">Location</h3>
                </div>
              </div>

              <h4 class="mb-10 mt-2 text-h5 font-weight-bold text-center">
                Coffee bean location in the north of Thailand
              </h4>
              <v-btn
                color="rgb(140, 115, 70)"
                height="25"
                width="120"
                variant="elevated"
                rounded="xl"
                class="viewbtn ml-n15"
                >View All</v-btn
              >
            </div>
          </div>

          <!--Show on screen bigger than lg 1280px++ -->
          <div class="justify-end d-none d-lg-flex">
            <v-img
              height="50"
              max-width="50"
              src="@/assets/location-no-bg.gif"
            />
            <div>
              <div class="text-h2">
                <h3>Location</h3>
              </div>

              <h4 class="ml-1 mb-10 mt-2 text-h5 font-weight-bold">
                Coffee bean location in the north of Thailand
              </h4>
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

        <div class="d-none d-sm-flex container-1">
          <v-col>
            <v-img src="@/assets/pin-no-bg.png" width="35" class="pin" />
            <v-img
              width="300"
              max-height="450"
              src="@/assets/Map-no-bg.png"
              class=""
            />
          </v-col>
        </div>
      </v-row>
    </v-card>

    <v-row class="justify-center mb-15 mt-5">
      <v-card color="white" flat width="175">
        <h1 class="text-black blog-head">Our Blog</h1>
      </v-card>
      <v-divider color="brown" class="mt-n6 divider"></v-divider>
    </v-row>
    <div>
      <v-col>
        <v-row>
          <v-card class="mx-auto" max-width="344" color="rgb(240, 240, 240)">
            <v-img src="@/assets/blog1.jpg" height="200px" cover></v-img>
            <div>
              <v-row class="mt-5 ml-3">
                <v-icon icon="mdi-calendar" color="grey"></v-icon>
                <p class="ml-2 text-grey">Nov 12 , 2023</p>
                <v-icon class="ml-3" icon="mdi-comment" color="grey"></v-icon>
                <p class="ml-2 text-grey">6</p>
                <v-icon class="ml-3" icon="mdi-eye" color="grey"></v-icon>
                <p class="ml-2 text-grey">76</p>
              </v-row>
            </div>
            <v-card-title>
              <b
                >The difference between Arabica and Robusta coffee
              </b></v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="rgb(140, 115, 70)"
                width="120"
                height="25"
                rounded="xl"
                variant="elevated"
                class="mb-3 mt-3"
              >
                Read More
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-card class="mx-auto" max-width="344" color="rgb(240, 240, 240)">
            <v-img src="@/assets/blog2.jpg" height="200px" cover></v-img>
            <div>
              <v-row class="mt-5 ml-3">
                <v-icon icon="mdi-calendar" color="grey"></v-icon>
                <p class="ml-2 text-grey">June 20 , 2023</p>
                <v-icon class="ml-3" icon="mdi-comment" color="grey"></v-icon>
                <p class="ml-2 text-grey">9</p>
                <v-icon class="ml-3" icon="mdi-eye" color="grey"></v-icon>
                <p class="ml-2 text-grey">29</p>
              </v-row>
            </div>
            <v-card-title>
              <b
                >What types of coffee beans are grown in each region of
                Thailand?
              </b></v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="rgb(140, 115, 70)"
                width="120"
                height="25"
                rounded="xl"
                variant="elevated"
                class="mb-3 mt-3"
              >
                Read More
              </v-btn>
            </v-card-actions>
          </v-card>
          <v-card class="mx-auto" max-width="344" color="rgb(240, 240, 240)">
            <v-img src="@/assets/blog3.jpg" height="200px" cover></v-img>
            <div>
              <v-row class="mt-5 ml-3">
                <v-icon icon="mdi-calendar" color="grey"></v-icon>
                <p class="ml-2 text-grey">Sep 11 , 2022</p>
                <v-icon class="ml-3" icon="mdi-comment" color="grey"></v-icon>
                <p class="ml-2 text-grey">1</p>
                <v-icon class="ml-3" icon="mdi-eye" color="grey"></v-icon>
                <p class="ml-2 text-grey">11</p>
              </v-row>
            </div>
            <v-card-title>
              <b
                >Get to know "Arabica", the ultimate in delicious coffee
                varieties
              </b></v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="rgb(140, 115, 70)"
                width="120"
                height="25"
                rounded="xl"
                variant="elevated"
                class="mb-3 mt-3"
              >
                Read More
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-col>
    </div>
  </div>
</template>
<style scoped>
.bg-repeat {
  background-image: url("../assets/coffeeHome-30.png");
  background-position: center;
  background-repeat: repeat;
  background-size: 400px;
}
.viewbtn {
  left: 50%;
}
.location {
  position: relative;
  left: 25%;
}
.blog-head {
  position: relative;
  display: flex;
  justify-content: center;
}
.container-1 {
  width: 45%;
}
.pin {
  top: 30px;
  left: 75px;
  z-index: +1;
  position: relative;
}
.divider {
  z-index: -1;
}
</style>
