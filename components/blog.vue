
<template>
  <v-divider> </v-divider>
  <div class="d-flex flex-column justify-center align-center ml-16 mt-9">
    <v-row>
      <v-col>
        <v-img
          class="mt-6"
          height="771"
          aspect-ratio="1/1"
          cover
          src="@/assets/picblog1.png"
        >
          <div
            class="d-flex flex-column fill-height justify-end align-start text-white"
          >
            <v-card color="rgba(60, 60, 60, 0.7)">
              <div class="text-white">
                <h2 class="mb-4 mx-4">
                  5 coffee farms that are most worth visiting in the northern
                  region
                </h2>
                <v-row class="mt-5 ml-3 mb-5">
                  <v-icon icon="mdi-calendar" color="grey"></v-icon>
                  <p class="ml-2 text-grey">Nov 12 , 2023</p>
                  <v-icon class="ml-3" icon="mdi-comment" color="grey"></v-icon>
                  <p class="ml-2 text-grey">6</p>
                  <v-icon class="ml-3" icon="mdi-eye" color="grey"></v-icon>
                  <p class="ml-2 text-grey">76</p>
                </v-row>
              </div>
            </v-card>
          </div>
        </v-img>
      </v-col>
      <v-col>
        <v-img
          class="mt-6"
          :width="600"
          aspect-ratio="16/9"
          cover
          src="@/assets/picblog2.jpg"
        >
          <div
            class="d-flex flex-column fill-height justify-end align-start text-white"
          >
            <v-card color="rgba(60, 60, 60, 0.7)">
              <div class="text-white">
                <h2 class="mb-4 mx-4">
                  The most popular types of coffee beans that people drink
                </h2>
                <v-row class="mt-5 ml-3 mb-5">
                  <v-icon icon="mdi-calendar" color="grey"></v-icon>
                  <p class="ml-2 text-grey">Nov 9 , 2023</p>
                  <v-icon class="ml-3" icon="mdi-comment" color="grey"></v-icon>
                  <p class="ml-2 text-grey">7</p>
                  <v-icon class="ml-3" icon="mdi-eye" color="grey"></v-icon>
                  <p class="ml-2 text-grey">89</p>
                </v-row>
              </div>
            </v-card>
          </div>
        </v-img>

        <v-img
          class="mt-7"
          :width="600"
          aspect-ratio="16/9"
          cover
          src="@/assets/picblog3.jpg"
        >
          <div
            class="d-flex flex-column fill-height justify-end align-start text-white"
          >
            <v-card color="rgba(60, 60, 60, 0.7)">
              <div class="text-white">
                <h2 class="mb-4 mx-4">
                  A drink made from dark roasted coffee beans
                </h2>
                <v-row class="mt-5 ml-3 mb-5">
                  <v-icon icon="mdi-calendar" color="grey"></v-icon>
                  <p class="ml-2 text-grey">Nov 5 , 2023</p>
                  <v-icon class="ml-3" icon="mdi-comment" color="grey"></v-icon>
                  <p class="ml-2 text-grey">15</p>
                  <v-icon class="ml-3" icon="mdi-eye" color="grey"></v-icon>
                  <p class="ml-2 text-grey">107</p>
                </v-row>
              </div>
            </v-card>
          </div>
        </v-img>
      </v-col>
    </v-row>
  </div>
  <v-row class="ml-15 mb-15 mt-15">
    <v-card color="white" flat width="300">
      <h1 class="text-black blog-head text-brown">RECENT POST</h1>
    </v-card>
    <v-divider color="brown" class="mt-n6 divider"></v-divider>
  </v-row>

  <v-card color="rgb(240, 240, 240)" height="300" width="1300" class="ml-16">
    <v-row>
      <div>
        <v-img
          class="mt-10 ml-9"
          :width="400"
          height="250"
          aspect-ratio="4/3"
          cover
          src="@/assets/blog4.jpeg"
        >
        </v-img>
      </div>
      <div
        class="d-flex flex-column fill-height justify-end align-start"
      >
        <v-row class="mt-10 ml-10 mb-5">
          <v-icon icon="mdi-calendar" color="grey"></v-icon>
          <p class="ml-2 text-grey">Nov 12 , 2023</p>
          <v-icon class="ml-3" icon="mdi-comment" color="grey"></v-icon>
          <p class="ml-2 text-grey">6</p>
          <v-icon class="ml-3" icon="mdi-eye" color="grey"></v-icon>
          <p class="ml-2 text-grey">76</p>
        </v-row>
        <div>
          <h1 class="ml-10 mb-4 mx-4 text-black">
            The difference between Arabica and Robusta coffee.
          </h1>
        </div>
      
      <div class="d-flex jutify-end align-end mt-16 ml-2">
        <v-btn block rounded="xl" size="large" class="mt-2" color="brown">Read More</v-btn>
      </div>
    </div>
    </v-row>
  </v-card>

  <v-card color="rgb(240, 240, 240)" height="300" width="1300" class="ml-16 mt-15">
    <v-row>
      <div>
        <v-img
          class="mt-10 ml-9"
          :width="400"
          height="250"
          aspect-ratio="4/3"
          cover
          src="@/assets/blog5.jpeg"
        >
        </v-img>
      </div>
      <div
        class="d-flex flex-column fill-height justify-end align-start"
      >
        <v-row class="mt-10 ml-10 mb-5">
          <v-icon icon="mdi-calendar" color="grey"></v-icon>
          <p class="ml-2 text-grey">Nov 12 , 2023</p>
          <v-icon class="ml-3" icon="mdi-comment" color="grey"></v-icon>
          <p class="ml-2 text-grey">6</p>
          <v-icon class="ml-3" icon="mdi-eye" color="grey"></v-icon>
          <p class="ml-2 text-grey">76</p>
        </v-row>
        <div>
          <h1 class="ml-10 mb-4 mx-4 text-black">
            The difference between Arabica and Robusta coffee.
          </h1>
        </div>
      
      <div class="d-flex jutify-end align-end mt-16 ml-2">
        <v-btn block rounded="xl" size="large" class="mt-2" color="brown">Read More</v-btn>
      </div>
    </div>
    </v-row>
  </v-card>

  <v-card color="rgb(240, 240, 240)" height="300" width="1300" class="ml-16 mt-15">
    <v-row>
      <div>
        <v-img
          class="mt-10 ml-9"
          :width="400"
          height="250"
          aspect-ratio="4/3"
          cover
          src="@/assets/blog6.jpeg"
        >
        </v-img>
      </div>
      <div
        class="d-flex flex-column fill-height justify-end align-start"
      >
        <v-row class="mt-10 ml-10 mb-5">
          <v-icon icon="mdi-calendar" color="grey"></v-icon>
          <p class="ml-2 text-grey">Nov 12 , 2023</p>
          <v-icon class="ml-3" icon="mdi-comment" color="grey"></v-icon>
          <p class="ml-2 text-grey">6</p>
          <v-icon class="ml-3" icon="mdi-eye" color="grey"></v-icon>
          <p class="ml-2 text-grey">76</p>
        </v-row>
        <div>
          <h1 class="ml-10 mb-4 mx-4 text-black">
            The difference between Arabica and Robusta coffee.
          </h1>
        </div>
      
      <div class="d-flex jutify-end align-end mt-16 ml-2">
        <v-btn block rounded="xl" size="large" class="mt-2" color="brown">Read More</v-btn>
      </div>
    </div>
    </v-row>
  </v-card>
</template>

