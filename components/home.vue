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
              <div class="text-h3 " >
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
    <div>
           <v-divider class="mt-15 mb-15" color="brown">  </v-divider>
            <v-row justify="center">
              <h1 class="mb-15 text-black">Our Blog</h1>
            </v-row> 
          </div>
          <div>
            <v-col>
              <v-row>
                <v-card
                  class="mx-auto"
                  max-width="344"
                  color="rgb(240, 240, 240)"
                >
                  <v-img src="@/assets/blog1.jpg" height="200px" cover></v-img>
                  <div>
                  <v-row class="mt-5 ml-3">
                  <v-icon icon="mdi-calendar" color="grey" ></v-icon> 
                  <p class="ml-2 text-grey" >Nov 12 , 2023</p>
                </v-row>
              </div>
                  <v-card-title > <b>The difference between Arabica and Robusta coffee </b></v-card-title>
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
                <v-card
                  class="mx-auto"
                  max-width="344"
                  color="rgb(240, 240, 240)"
                >
                  <v-img src="@/assets/blog2.jpg" height="200px" cover></v-img>
                  <div>
                  <v-row class="mt-5 ml-3">
                  <v-icon icon="mdi-calendar" color="grey" ></v-icon> 
                  <p class="ml-2 text-grey" >Nov 12 , 2023</p>
                </v-row>
              </div>
                  <v-card-title> <b>What types of coffee beans are grown in each region of
                    Thailand? </b></v-card-title>
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
                <v-card
                  class="mx-auto"
                  max-width="344"
                  color="rgb(240, 240, 240)"
                >
                  <v-img src="@/assets/blog3.jpg" height="200px" cover></v-img>
                  <div>
                  <v-row class="mt-5 ml-3">
                  <v-icon icon="mdi-calendar" color="grey" ></v-icon> 
                  <p class="ml-2 text-grey" >Nov 12 , 2023</p>
                </v-row>
              </div>
                  <v-card-title> <b>Get to know "Arabica", the ultimate in delicious coffee
                    varieties </b></v-card-title>
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
  </v-parallax>
</template>
