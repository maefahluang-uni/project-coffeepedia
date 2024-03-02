<template>
  <div class="d-none d-sm-flex my-10 mx-5 justify-center">
    <v-card flat @click="log(1)">
      <v-img
        height="600"
        class="d-flex align-end"
        cover
        src="@/assets/picblog3.jpg"
      >
        <div class="text-white">
          <v-card color="rgba(60, 60, 60, 0.7)">
            <div class="text-white">
              <h2 class="mx-5 mt-2">
                A drink made from dark roasted coffee beans
              </h2>
              <v-row class="d-flex mx-5 my-2 align-center">
                <div class="d-flex">
                  <v-icon
                    class="mr-2"
                    icon="mdi-calendar"
                    color="grey"
                  ></v-icon>
                  <p class="text-grey mr-2">Nov 5 , 2023</p>
                </div>
                <div class="d-flex">
                  <v-icon class="mr-2" icon="mdi-comment" color="grey"></v-icon>
                  <p class="text-grey mr-2">15</p>
                </div>
                <div class="d-flex">
                  <v-icon class="mr-2" icon="mdi-eye" color="grey"></v-icon>
                  <p class="text-grey">107</p>
                </div>
              </v-row>
            </div>
          </v-card>
        </div>
      </v-img>
    </v-card>

    <v-card flat class="ml-5">
      <v-card flat @click="log(2)">
        <v-img
          height="290"
          class="d-flex align-end"
          cover
          src="@/assets/picblog2.jpg"
        >
          <div class="text-white">
            <v-card color="rgba(60, 60, 60, 0.7)">
              <div class="text-white">
                <h2 class="mx-5 my-2">
                  The most popular types of coffee beans that people drink
                </h2>
                <v-row class="d-flex mx-5 my-2 align-center">
                  <v-icon
                    class="mr-2"
                    icon="mdi-calendar"
                    color="grey"
                  ></v-icon>
                  <p class="text-grey mr-2">Nov 9 , 2023</p>
                  <v-icon class="mr-2" icon="mdi-comment" color="grey"></v-icon>
                  <p class="text-grey mr-2">7</p>
                  <v-icon class="mr-2" icon="mdi-eye" color="grey"></v-icon>
                  <p class="text-grey">89</p>
                </v-row>
              </div>
            </v-card>
          </div>
        </v-img>
      </v-card>
      <v-card flat class="mt-5" @click="log(3)">
        <v-img
          height="290"
          class="d-flex align-end"
          cover
          src="@/assets/picblog1.png"
        >
          <div class="text-white">
            <v-card color="rgba(60, 60, 60, 0.7)">
              <div class="text-white">
                <h2 class="mx-5 my-2">
                  5 coffee farms that are most worth visiting in the northern
                  region
                </h2>
                <v-row class="d-flex mx-5 my-2 align-center">
                  <v-icon
                    class="mr-2"
                    icon="mdi-calendar"
                    color="grey"
                  ></v-icon>
                  <p class="text-grey mr-2">Nov 12 , 2023</p>
                  <v-icon class="mr-2" icon="mdi-comment" color="grey"></v-icon>
                  <p class="text-grey mr-2">6</p>
                  <v-icon class="mr-2" icon="mdi-eye" color="grey"></v-icon>
                  <p class="text-grey">76</p>
                </v-row>
              </div>
            </v-card>
          </div>
        </v-img>
      </v-card>
    </v-card>
  </div>

  <div class="d-flex d-sm-none ma-2 justify-center">
    <v-card flat @click="log(1)">
      <v-img
        height="400"
        class="d-flex align-end"
        cover
        src="@/assets/picblog3.jpg"
      >
        <div class="text-white">
          <v-card color="rgba(60, 60, 60, 0.7)">
            <div class="text-white">
              <h3 class="mx-2 mt-2 clamp-3">
                A drink made from dark roasted coffee beans
              </h3>
              <v-row class="d-flex mx-2 my-2 align-center">
                <div class="d-flex">
                  <v-icon
                    class="mr-2"
                    icon="mdi-calendar"
                    color="grey"
                    size="15"
                  ></v-icon>
                  <h6 class="text-grey mr-2">Nov 5 , 2023</h6>
                </div>
                <div class="d-flex">
                  <v-icon
                    class="mr-2"
                    icon="mdi-comment"
                    color="grey"
                    size="15"
                  ></v-icon>
                  <h6 class="text-grey mr-2">15</h6>
                </div>
                <div class="d-flex">
                  <v-icon
                    class="mr-2"
                    icon="mdi-eye"
                    color="grey"
                    size="15"
                  ></v-icon>
                  <h6 class="text-grey">107</h6>
                </div>
              </v-row>
            </div>
          </v-card>
        </div>
      </v-img>
    </v-card>

    <v-card flat class="ml-2">
      <v-card flat @click="log(2)">
        <v-img
          height="196"
          class="d-flex align-end"
          cover
          src="@/assets/picblog2.jpg"
        >
          <div class="text-white">
            <v-card color="rgba(60, 60, 60, 0.7)">
              <div class="text-white">
                <h3 class="mx-2 my-2 clamp-2">
                  The most popular types of coffee beans that people drink
                </h3>
                <v-row class="d-flex mx-2 my-2 align-center">
                  <v-icon
                    class="mr-2"
                    icon="mdi-calendar"
                    color="grey"
                    size="15"
                  ></v-icon>
                  <h6 class="text-grey mr-2">Nov 9 , 2023</h6>
                  <v-icon
                    class="mr-2"
                    icon="mdi-comment"
                    color="grey"
                    size="15"
                  ></v-icon>
                  <h6 class="text-grey mr-2">7</h6>
                  <v-icon
                    class="mr-2"
                    icon="mdi-eye"
                    color="grey"
                    size="15"
                  ></v-icon>
                  <h6 class="text-grey">89</h6>
                </v-row>
              </div>
            </v-card>
          </div>
        </v-img>
      </v-card>
      <v-card flat class="mt-2" @click="log(3)">
        <v-img
          height="196"
          class="d-flex align-end"
          cover
          src="@/assets/picblog1.png"
        >
          <div class="text-white">
            <v-card color="rgba(60, 60, 60, 0.7)">
              <div class="text-white">
                <h3 class="mx-2 my-2 clamp-2">
                  5 coffee farms that are most worth visiting in the northern
                  region
                </h3>
                <v-row class="d-flex mx-2 my-2 align-center">
                  <v-icon
                    class="mr-2"
                    icon="mdi-calendar"
                    color="grey"
                    size="15"
                  ></v-icon>
                  <h6 class="text-grey mr-2">Nov 12 , 2023</h6>
                  <v-icon
                    class="mr-2"
                    icon="mdi-comment"
                    color="grey"
                    size="15"
                  ></v-icon>
                  <h6 class="text-grey mr-2">6</h6>
                  <v-icon
                    class="mr-2"
                    icon="mdi-eye"
                    color="grey"
                    size="15"
                  ></v-icon>
                  <h6 class="text-grey">76</h6>
                </v-row>
              </div>
            </v-card>
          </div>
        </v-img>
      </v-card>
    </v-card>
  </div>

  <v-row class="justify-center mb-12 mt-5 d-flex d-sm-none">
    <v-card flat width="150">
      <h2 class="text-black blog-head">Lastest Blog</h2>
    </v-card>
    <v-divider color="black" class="mt-n5 divider"></v-divider>
  </v-row>

  <v-row class="justify-center mb-12 mt-5 d-none d-sm-flex">
    <v-card flat width="200">
      <h1 class="text-black blog-head">Lastest Blog</h1>
    </v-card>
    <v-divider color="black" class="mt-n6 divider"></v-divider>
  </v-row>
</template>
<script>
export default {
  methods: {
    log(num) {
      console.log("click blog " + num);
    },
  },
};
</script>
<style>
.clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.blog-head {
  position: relative;
  display: flex;
  justify-content: center;
}
.divider {
  z-index: -1;
}
</style>
