<template>
  <div v-if="topBlogs.length == 0" class="d-flex ma-2 justify-center">
    <v-skeleton-loader
      v-for="n in 3"
      :elevation="5"
      type="card"
      width="200"
      class="ma-2"
    ></v-skeleton-loader>
  </div>
  <div v-else class="d-flex mx-2 justify-center">
    <v-card flat @click="showDetail(topBlogs[0])" class="card1 d-flex">
      <v-img
        class="d-flex align-end"
        cover
        :src="blogImage(topBlogs[0].imageURL)"
      >
        <div class="text-white">
          <v-card color="rgba(60, 60, 60, 0.7)">
            <div class="text-white">
              <h1 class="mt-2 blog-title">
                {{ topBlogs[0].title }}
              </h1>
              <v-row class="d-flex my-2 align-center blog-subtitle">
                <div class="mr-2 d-flex">
                  <p class="text-grey">
                    {{ formatDateNotime(topBlogs[0].date) }}
                  </p>
                </div>
                <div class="mr-2 d-flex">
                  <v-icon class="mr-2" icon="mdi-comment" color="grey"></v-icon>
                  <p class="text-grey">{{ topBlogs[0].commentCount }}</p>
                </div>
                <div class="d-flex">
                  <v-icon class="mr-2" icon="mdi-eye" color="grey"></v-icon>
                  <p class="text-grey">{{ topBlogs[0].viewCount }}</p>
                </div>
              </v-row>
            </div>
          </v-card>
        </div>
      </v-img>
    </v-card>

    <div flat class="cards-right">
      <v-card flat @click="showDetail(topBlogs[1])" class="d-flex card2">
        <v-img
          class="d-flex align-end"
          cover
          :src="blogImage(topBlogs[1].imageURL)"
        >
          <div class="text-white">
            <v-card color="rgba(60, 60, 60, 0.7)">
              <div class="text-white">
                <h1 class="my-2 blog-title">
                  {{ topBlogs[1].title }}
                </h1>
                <v-row class="d-flex my-2 align-center blog-subtitle">
                  <p class="text-grey mr-2">
                    {{ formatDateNotime(topBlogs[1].date) }}
                  </p>
                  <div class="mr-2 d-flex">
                    <v-icon
                      class="mr-2"
                      icon="mdi-comment"
                      color="grey"
                    ></v-icon>
                    <p class="text-grey">{{ topBlogs[1].commentCount }}</p>
                  </div>
                  <div class="d-flex">
                    <v-icon class="mr-2" icon="mdi-eye" color="grey"></v-icon>
                    <p class="text-grey">{{ topBlogs[1].viewCount }}</p>
                  </div>
                </v-row>
              </div>
            </v-card>
          </div>
        </v-img>
      </v-card>

      <v-card flat class="card3 d-flex" @click="showDetail(topBlogs[2])">
        <v-img
          class="d-flex align-end"
          cover
          :src="blogImage(topBlogs[2].imageURL)"
        >
          <div class="text-white">
            <v-card color="rgba(60, 60, 60, 0.7)">
              <div class="text-white">
                <h1 class="my-2 blog-title">
                  {{ topBlogs[2].title }}
                </h1>
                <v-row class="d-flex my-2 align-center blog-subtitle">
                  <p class="text-grey mr-2">
                    {{ formatDateNotime(topBlogs[2].date) }}
                  </p>
                  <div class="mr-2 d-flex">
                    <v-icon
                      class="mr-2"
                      icon="mdi-comment"
                      color="grey"
                    ></v-icon>
                    <p class="text-grey">{{ topBlogs[2].commentCount }}</p>
                  </div>
                  <div class="d-flex">
                    <v-icon class="mr-2" icon="mdi-eye" color="grey"></v-icon>
                    <p class="text-grey">{{ topBlogs[2].viewCount }}</p>
                  </div>
                </v-row>
              </div>
            </v-card>
          </div>
        </v-img>
      </v-card>
    </div>
  </div>

  <v-row class="justify-start ml-10 mb-5 mt-5 d-flex blog-line">
    <v-card flat class="px-2">
      <h1 class="text-brown blog-head">Recent post</h1>
    </v-card>
    <v-divider color="black" class="divider"></v-divider>
  </v-row>
  <container class="d-flex justify-center mx-2" fluid>
    <v-skeleton-loader
      v-if="blogs.length == 0"
      v-for="n in 3"
      :elevation="5"
      type="article"
      class="mb-7 mx-2"
    ></v-skeleton-loader>

    <v-data-iterator v-else :items="blogs" :items-per-page="itemPerPage">
      <template v-slot:default="{ items }">
        <v-card
          v-for="(blog, index) in items"
          class="mb-7 elevation-5 d-flex recent-blog-card"
          @click="showDetail(blog.raw)"
          color="#F1F1F1"
        >
          <div v-if="blog.raw.IsActivate == 1" class="d-flex">
            <v-img
              class="d-flex blog-img"
              cover
              :src="blogImage(blog.raw.imageURL)"
            />

            <div>
              <p class="blog-title mt-2">
                {{ blog.raw.title }}
              </p>
              <v-row class="d-flex mx-5 mt-1 blog-subtitle">
                <p class="text-grey mr-2">
                  {{ formatDateNotime(blog.raw.date) }}
                </p>
                <div class="mr-2 d-flex">
                  <v-icon class="mr-2" icon="mdi-comment" color="grey"></v-icon>
                  <p class="text-grey">{{ blog.raw.commentCount }}</p>
                </div>
                <div class="d-flex">
                  <v-icon class="mr-2" icon="mdi-eye" color="grey"></v-icon>
                  <p class="text-grey">{{ blog.raw.viewCount }}</p>
                </div>
              </v-row>
              <div class="text-grey blog-subtitle clamp mx-5 my-4">
                {{ blog.raw.content.replace(/<[^>]*>/g, "") }}
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
        <v-overlay v-model="overlay" class="align-top justify-center pt-10"
          ><v-card class="overflow-auto blog-detail-card justify-center pa-5">
            <h1 class="font-weight-bold">
              {{ selectblog.title }}
            </h1>

            <div class="d-flex mx-5 my-2 align-center blog-subtitle">
              <p class="text-grey mr-2">
                {{ formatDateNotime(selectblog.date) }}
              </p>
              <div class="mr-2 d-flex">
                <v-icon class="mr-2" icon="mdi-comment" color="grey"></v-icon>
                <p class="text-grey">{{ selectblog.commentCount }}</p>
              </div>
              <div class="d-flex">
                <v-icon class="mr-2" icon="mdi-eye" color="grey"></v-icon>
                <p class="text-grey">{{ selectblog.viewCount }}</p>
              </div>
            </div>
            <v-divider></v-divider>
            <div
              contenteditable="false"
              v-html="selectblog.content"
              class="my-4"
            ></div>
            <v-divider></v-divider>

            <div v-for="(comment, index) in comments">
              <div class="d-flex mt-4 mb-2 justify-space-between align-center">
                <div class="text-black">
                  {{ comment.comment }}
                </div>
                <p class="text-grey">
                  {{ formatDateWithTime(comment.datetime) }}
                </p>
              </div>
              <v-divider></v-divider>
            </div>
            <v-card class="mt-4" color="#C8B099"
              ><div class="d-flex ma-4">
                <div class="text-black font-weight-bold text-h5">Comment</div>
              </div>
              <div class="d-flex mx-4">
                <v-text-field v-model="comment" variant="solo"> </v-text-field>
                <v-btn
                  class="mt-1 ml-2"
                  icon="mdi-send"
                  @click="confirmComment(comment, selectblog.ID)"
                ></v-btn>
              </div>
            </v-card>
          </v-card>
          <v-overlay v-model="overlay2" class="align-center justify-center">
            <v-card
              class="text-white rounded-lg text-center d-flex justify-center align-center"
              color="#222222"
              width="250"
              height="150"
            >
              <div>
                <div>Post this comment?</div>
                <div class="d-flex mt-5">
                  <v-btn
                    class="mr-5 rounded-pill"
                    color="error"
                    @click="cancelComment()"
                    >cancel</v-btn
                  ><v-btn
                    class="rounded-pill"
                    @click="sendComment(comment, selectblog.ID)"
                    >post</v-btn
                  >
                </div>
              </div>
            </v-card>
          </v-overlay>
        </v-overlay>
      </template>
      <template v-if="showSeeMore" v-slot:footer="{}">
        <div class="d-flex mb-7 justify-center">
          <v-btn variant="outlined" @click="seeMore(4)"> See more </v-btn>
        </div>
      </template>
    </v-data-iterator>
  </container>
</template>
<script>
import axios from "axios";
import config from "../config.js";
const api = config.LOCAL_API_URL;
const apiKey = config.API_KEY;
const apiHaders = { "ngrok-skip-browser-warning": "true", "api-key": apiKey };
export default {
  data() {
    return {
      overlay: false,
      overlay2: false,
      itemPerPage: 4,
      showSeeMore: false,
      selectblog: "",
      selectedblogID: -1,
      comment: "",

      blogs: [],
      topBlogs: [],
      comments: [],
    };
  },
  created() {
    this.getAllBlogs();
    this.getTopBlogs();
  },
  methods: {
    async retryAfterDelay(apiCall) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await apiCall();
    },
    async getAllBlogs() {
      try {
        const blogsResponse = await axios.get(api + "api/blogs?admin=false", {
          headers: apiHaders,
        });
        this.blogs = blogsResponse.data.response;

        this.showSeeMore = true;
        if (this.itemPerPage >= this.blogs.length) {
          this.showSeeMore = false;
        }
      } catch (error) {
        console.error("Error fetching all blogs:", error);
        await this.retryAfterDelay(this.getAllBlogs);
      }
    },
    async getTopBlogs() {
      try {
        const topblogsResponse = await axios.get(api + "api/blogs/top", {
          headers: apiHaders,
        });
        this.topBlogs = topblogsResponse.data.response;
      } catch (error) {
        console.error("Error fetching all blogs:", error);
        await this.retryAfterDelay(this.getTopBlogs);
      }
    },

    async getComments(BlogID) {
      if (this.selectedblogID != BlogID) {
        try {
          const commentsResponse = await axios.get(
            api + "api/blogs/comments/" + BlogID,
            {
              headers: apiHaders,
            }
          );
          this.comments = commentsResponse.data.response;
          this.selectedblogID = BlogID;
        } catch (error) {
          console.error("Error fetching all blogs:", error);
          await this.retryAfterDelay(this.getTopBlogs);
        }
        return;
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
    async addComment(BlogID, comment, timestamp) {
      let newComment = {
        BlogID: BlogID,
        comment: comment,
        timestamp: timestamp,
      };
      const res = await axios.post(api + "api/blogs/comment", newComment, {
        headers: apiHaders,
      });
      if (res.status == 200) {
        this.comments.push({ comment: comment, datetime: timestamp });
        this.overlay2 = !this.overlay2;
        this.comment = "";
      }
    },
    seeMore(plusNum) {
      if (this.itemPerPage <= this.blogs.length - 1) {
        this.itemPerPage += plusNum;
        if (this.itemPerPage >= this.blogs.length - 1) {
          this.showSeeMore = false;
        }
      }
    },
    confirmComment(comment) {
      if (comment != "") {
        this.overlay2 = !this.overlay2;
      }
    },
    sendComment(comment, BlogID) {
      let timestamp = Date.now();
      const nowDateObj = new Date(timestamp);
      // Extract the components of the date object (year, month, day, hour, minute, second)
      const year = nowDateObj.getFullYear();
      const month = String(nowDateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
      const day = String(nowDateObj.getDate()).padStart(2, "0");
      const hours = String(nowDateObj.getHours()).padStart(2, "0");
      const minutes = String(nowDateObj.getMinutes()).padStart(2, "0");
      const seconds = String(nowDateObj.getSeconds()).padStart(2, "0");

      const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      this.addComment(BlogID, comment, formattedDateTime);
    },
    cancelComment() {
      this.overlay2 = !this.overlay2;
    },
    blogImage(url) {
      if (!url) {
        return "https://static.vecteezy.com/system/resources/previews/004/141/669/large_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";
      }
      return `${url}`;
    },
    async addView(id) {
      try {
        const response = await axios.get(api + "api/blogs/view/" + id, {
          headers: apiHaders,
        });
      } catch (error) {
        console.error("Error add view blog ID:", blog.ID, "\nError:", error);
      }
    },
    showDetail(blog) {
      this.addView(blog.ID);
      this.getComments(blog.ID);
      this.overlay = true;
      this.selectblog = blog;
    },
  },
  watch: {
    overlay(val) {
      if (this.overlay == false) {
        this.comment = "";
      }
    },
  },
};
</script>
<style>
:root {
  --default-card1-height: 600px;
  --default-cards-width: 1000px;
  --default-margin-card: 20px;
  --card1-height: var(--default-card1-height);
  --margin-card: var(--default-margin-card);
}
.divider {
  position: absolute;
  width: 100%;
  height: 1px;
  z-index: -1;
  top: 50%;
  transform: translateY(-50%);
}
.blog-line {
  position: relative;
}
.blog-head {
  position: relative;
  display: flex;
  justify-content: center;
}
.clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.blog-detail-card {
  width: 80vw;
  height: 93dvh;
}

@media (max-width: 600px) {
  :root {
    --card1-height: calc(var(--default-card1-height) - 300px);
    --margin-card: calc(var(--default-margin-card) * (2 / 5));
  }
  .blog-subtitle {
    font-size: 12px;
  }
  .blog-title {
    font-size: 1em;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-left: 10px;
    margin-right: 10px;
  }
  .blog-img {
    width: 150px;
    height: 100%;
  }
  .card1 {
    height: var(--card1-height);
  }
  .card1 .blog-subtitle,
  .card2 .blog-subtitle,
  .card3 .blog-subtitle {
    margin-left: 8px;
    margin-right: 4px;
  }
  .cards-right {
    margin-left: var(--margin-card);
  }
  .card2 {
    height: calc((var(--card1-height) / 2) - (var(--margin-card) / 2));
  }
  .card3 {
    margin-top: var(--margin-card);
    height: calc((var(--card1-height) / 2) - (var(--margin-card) / 2));
  }
  .blog-detail-card {
    width: 95vw;
    height: 93dvh;
  }
}

@media (min-width: 601px) {
  .blog-title {
    font-size: 1.3em;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-left: 20px;
    margin-right: 20px;
  }
  .blog-subtitle {
    font-size: 14px;
  }
  .blog-img {
    width: 200px;
    height: 100%;
  }
  .card1 {
    height: var(--card1-height);
    width: calc((var(--default-cards-width) / 2) - (var(--margin-card) / 2));
  }
  .card1 .blog-subtitle,
  .card2 .blog-subtitle,
  .card3 .blog-subtitle {
    margin-left: 20px;
    margin-right: 10px;
  }
  .cards-right {
    margin-left: var(--margin-card);
  }
  .card2 {
    height: calc((var(--card1-height) / 2) - (var(--margin-card) / 2));
    max-width: calc(
      (var(--default-cards-width) / 2) - (var(--margin-card) / 2)
    );
  }
  .card3 {
    height: calc((var(--card1-height) / 2) - (var(--margin-card) / 2));
    max-width: calc(
      (var(--default-cards-width) / 2) - (var(--margin-card) / 2)
    );
    margin-top: var(--margin-card);
  }
  .recent-blog-card {
    max-width: var(--default-cards-width);
  }
}
</style>
