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

  <v-skeleton-loader
    v-if="blogs.length == 0"
    v-for="n in 3"
    :elevation="5"
    type="article"
    class="mb-7 mx-2 fill-width"
  ></v-skeleton-loader>
  <div v-else class="d-flex justify-center mx-2">
    <div>
      <v-card
        v-for="(blog, index) in blogs"
        class="mb-7 elevation-5 d-flex recent-blog-card"
        @click=""
        color="#F1F1F1"
      >
        <div class="d-flex">
          <v-img
            class="d-flex blog-img"
            cover
            :src="blogImage(blog.imageFile, blog.imageURL)"
          />

          <div>
            <p class="blog-title mt-2">
              {{ blog.title }}
            </p>
            <v-row class="d-flex mx-5 mt-1 blog-subtitle">
              <p class="text-grey mr-2">
                {{ formatDateNotime(blog.date) }}
              </p>
              <div class="mr-2 d-flex">
                <v-icon class="mr-2" icon="mdi-comment" color="grey"></v-icon>
                <p class="text-grey">{{ blog.commentCount }}</p>
              </div>
              <div class="d-flex">
                <v-icon class="mr-2" icon="mdi-eye" color="grey"></v-icon>
                <p class="text-grey">{{ blog.viewCount }}</p>
              </div>
            </v-row>
            <div class="text-grey blog-subtitle clamp mx-5 my-4">
              {{ blog.content.replace(/<[^>]*>/g, "") }}
            </div>
            <div class="justify-end d-none d-sm-flex">
              <v-btn
                class="ma-4 rounded-xl"
                density="compact"
                color="rgb(140,115,70)"
              >
                <div class="blog-subtitle">read more</div>
              </v-btn>
            </div>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import config from "../config.js";
const api = config.LOCAL_API_URL;
export default {
  data() {
    return {
      blogs2: [
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

      blogs: [],
    };
  },
  mounted() {
    this.getAllBlogs();
  },
  methods: {
    async retryAfterDelay(apiCall) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await apiCall();
    },
    async getAllBlogs() {
      try {
        const blogsResponse = await axios.get(api + "/blogs/top", {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });
        this.blogs = blogsResponse.data.response;
      } catch (error) {
        console.error("Error fetching all blogs:", error);
        await this.retryAfterDelay(this.getAllBlogs);
      }
    },
    formatDateNotime(dateString) {
      const date = new Date(dateString);
      const options = { month: "short", day: "numeric", year: "numeric" };
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        date
      );
      return formattedDate;
    },
    formatDateWithTime(dateString) {
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      const date = new Date(dateString);
      return date.toLocaleString("en-US", options);
    },
    getImageUrl(buffer) {
      if (!buffer) return "";
      const uint32Array = new Uint32Array(buffer);
      const base64Image = btoa(String.fromCharCode.apply(null, uint32Array));
      return `data:image/jpeg;base64,${base64Image}`;
    },
    blogImage(buffer, url) {
      if (buffer == null) {
        return `${url}`;
      }
      if (url == null) {
        let imgurl = this.getImageUrl(buffer.data);
        return imgurl;
      }
      return "";
    },
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
