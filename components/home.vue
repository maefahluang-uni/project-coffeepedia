<template>
  <div class="bg-repeat">
    <v-card class="mx-auto mb-15 blur" color="rgba(200, 176, 153, 0.6)">
      <v-row>
        <v-col align-self="center">
          <!--Show on xs screen 	600px-- -->
          <div class="d-flex d-sm-none justify-center mt-5 mb-5">
            <div>
              <div class="mb-8">
                <div
                  class="d-inline-flex justify-center align-center location ml-n10"
                >
                  <img height="50" src="@/assets/location-no-bg.gif" />

                  <div class="text-h4">
                    <h4>Location</h4>
                  </div>
                </div>

                <p class="mt-2 text-center font-weight-bold text-black">
                  Coffee bean location in the north of Thailand
                </p>
              </div>
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
  </div>
  <v-row class="justify-center mb-15 mt-5">
    <v-card color="white" flat width="175">
      <h1 class="text-black blog-head">Our Blog</h1>
    </v-card>
    <v-divider color="brown" class="mt-n6 divider"></v-divider>
  </v-row>

  <div class="d-flex mb-5">
    <v-container>
      <v-row>
        <v-col
          v-for="(blog, index) in blogs"
          :key="index"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="mx-auto" max-width="344" color="rgb(240, 240, 240)">
            <v-img src="/assets/blog1.jpg" height="200px" cover></v-img>
            <div>
              <v-row class="mt-1 ml-1">
                <v-col cols="auto">
                  <v-icon icon="mdi-comment" color="grey"></v-icon>
                  <span class="text-caption ml-1">{{ blog.comments }}</span>
                </v-col>
                <v-col cols="auto">
                  <v-icon icon="mdi-eye" color="grey"></v-icon>
                  <span class="text-caption ml-1">{{
                    blog.views
                  }}</span> </v-col
                ><v-col cols="auto">
                  <span class="text-caption ml-1">{{ blog.date }}</span>
                </v-col>
              </v-row>
            </div>
            <div class="mt-3 ml-4 mr-3">
              <b class="text-h6 font-weight-bold">{{ blog.title }}</b>
            </div>

            <v-card-actions>
              <v-btn
                color="rgb(140, 115, 70)"
                width="120"
                height="25"
                rounded="xl"
                variant="elevated"
                class="mb-3 mt-3 ml-2"
                @click=""
              >
                Read More
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      blogs: [
        {
          id: 1,
          image: "/assets/blog1.jpg",
          date: "Nov 12, 2023",
          comments: "6",
          views: "76",
          title: "The difference between Arabica and Robusta coffee",
          href: "",
        },
        {
          id: 2,
          image: "/assets/blog2.jpg",
          date: "June 20, 2023",
          comments: "9",
          views: "29",
          title:
            "What types of coffee beans are grown in each region of Thailand?",
          href: "",
        },
        {
          id: 3,
          image: "/assets/blog3.jpg",
          date: "Sep 11, 2022",
          comments: 1,
          views: 11,
          title:
            "Get to know 'Arabica', the ultimate in delicious coffee varieties",
          href: "",
        },
      ],
    };
  },
};
</script>
<style scoped>
.bg-repeat {
  background-image: url("../assets/welcomepic2.jpg");
  background-position: center;

  background-size: cover;
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
.blur {
  backdrop-filter: blur(4px);
}
</style>
