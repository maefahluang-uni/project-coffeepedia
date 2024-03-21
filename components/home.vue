<template>
  <div class="bg-repeat">
    <v-card class="mx-auto mb-15 blur" color="rgba(200, 176, 153, 0.6)">
      <v-row class="justify-center">
        <div class="d-flex my-4 align-center">
          <!--Show on sx screen 	600px-- -->
          <div class="d-flex d-sm-none mt-5 mb-5">
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

          <!--Show on screen bigger than md 960px++ -->
          <div class="d-none d-sm-flex mt-5 mb-5 px-5">
            <img height="50" max-width="50" src="@/assets/location-no-bg.gif" />
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
          <div class="d-none d-sm-flex container-1">
            <v-col>
              <v-img src="@/assets/pin-no-bg.png" width="35" class="pin" />
              <v-img width="300" src="@/assets/Map-no-bg.png" class="" />
            </v-col>
          </div>
        </div>
      </v-row>
    </v-card>
  </div>
  <v-row class="justify-center mb-5 mt-5 d-flex blog-line">
    <v-card flat class="px-2">
      <h1 class="text-brown blog-head">Our Blog</h1>
    </v-card>
    <v-divider color="black" class="divider"></v-divider>
  </v-row>

  <div class="d-flex justify-center">
    <div>
      <v-card
        v-for="(blog, index) in blogs"
        class="mb-7 d-flex elevation-5"
        height="150"
        max-width="700"
      >
        <v-img
          class="d-flex"
          max-width="170"
          min-width="170"
          cover
          src="@/assets/picblog2.jpg"
        />
        <div>
          <p class="blog-title mt-2">
            {{ blog.title }}
          </p>
          <v-row class="d-flex mx-5 mt-1 align-center blog-subtitle">
            <p class="text-grey mr-2">{{ blog.date }}</p>
            <div class="mr-2 d-flex">
              <v-icon class="mr-2" icon="mdi-comment" color="grey"></v-icon>
              <p class="text-grey">{{ blog.commentCount }}</p>
            </div>
            <div class="d-flex">
              <v-icon class="mr-2" icon="mdi-eye" color="grey"></v-icon>
              <p class="text-grey">{{ blog.viewCount }}</p>
            </div>
          </v-row>
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      blogs: [
        {
          ID: "1",
          blogImage: "@/assets/picblog3.jpg",
          title: "A drink made from dark roasted coffee beans",
          blogContent: "",
          date: "Nov 5 , 2023",
          viewCount: "107",
          commentCount: "15",
        },
        {
          ID: "2",
          blogImage: "@/assets/picblog2.jpg",
          title: "The most popular types of coffee beans that people drink",
          blogContent: "",
          date: "Nov 9 , 2023",
          viewCount: "89",
          commentCount: "7",
        },
        {
          ID: "3",
          blogImage: "@/assets/picblog1.png",
          title:
            "5 coffee farms that are most worth visiting in the northern region",
          blogContent: "",
          date: "Nov 12 , 2023",
          viewCount: "76",
          commentCount: "6",
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
