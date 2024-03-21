<template>
  <div v-if="topBlogs.length == 0" class="d-flex ma-2 justify-center">
    <v-skeleton-loader
      :elevation="5"
      type="card"
      width="200"
    ></v-skeleton-loader>
  </div>
  <div v-else class="d-flex mx-2 justify-center">
    <v-card flat @click="showDetail(topBlogs[0])" class="card1 d-flex">
      <v-img
        class="d-flex align-end"
        cover
        :src="topBlogImage(topBlogs[0].imageFile, topBlogs[0].imageURL)"
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
          :src="topBlogImage(topBlogs[1].imageFile.data, topBlogs[1].imageURL)"
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
          :src="topBlogImage(topBlogs[2].imageFile.data, topBlogs[2].imageURL)"
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

  <v-row class="justify-center mb-5 mt-5 d-flex blog-line">
    <v-card flat class="px-2">
      <h1 class="text-brown blog-head">Lastest Blog</h1>
    </v-card>
    <v-divider color="black" class="divider"></v-divider>
  </v-row>
  <div class="d-flex justify-center mx-2">
    <div v-if="blogsDatabase.length == 0" class="d-flex">
      <v-skeleton-loader
        :elevation="5"
        type="article"
        width="300"
        class="mb-7"
      ></v-skeleton-loader>
    </div>
    <v-data-iterator
      v-else
      :items="blogsDatabase"
      :items-per-page="itemPerPage"
    >
      <template v-slot:default="{ items }">
        <v-card
          v-for="(blog, index) in items"
          class="mb-7 d-flex elevation-5"
          height="200"
          max-width="700"
          @click="showDetail(blog.raw)"
          color="#F1F1F1"
        >
          <div v-if="blog.raw.IsActivate == 1" class="d-flex">
            <v-img
              v-if="blog.raw.imageFile != null"
              class="d-flex"
              max-width="200"
              min-width="200"
              cover
              :src="getImageUrl(blog.raw.imageFile.data)"
            />
            <v-img
              v-if="blog.raw.imageURL != null"
              class="d-flex"
              max-width="200"
              min-width="200"
              cover
              :src="blog.raw.imageURL"
            />
            <div>
              <p class="blog-title mt-2">
                {{ blog.raw.title }}
              </p>
              <v-row class="d-flex mx-5 mt-1 align-center blog-subtitle">
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
              <div class="text-grey blog-subtitle clamp mx-5 mt-4">
                {{ blog.raw.content.replace(/<[^>]*>/g, "") }}
              </div>
              <div
                class="text-grey text-end blog-subtitle text-decoration-underline mt-2 mx-5"
              >
                read more
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
            <v-card class="mt-4" color="#C8B099"
              ><div class="d-flex ma-4">
                <div class="text-white font-weight-bold text-h5">Com</div>
                <div class="text-black font-weight-bold text-h5">ment</div>
              </div>
              <div class="d-flex mx-4">
                <v-text-field v-model="comment" variant="outlined">
                </v-text-field>
                <v-btn
                  class="mt-1 ml-2"
                  icon="mdi-share"
                  @click="confirmComment(comment, selectblog.ID)"
                ></v-btn>
              </div>
            </v-card>
            <div v-for="(comment, index) in comments">
              <div class="d-flex mt-4 mb-2 justify-space-between align-center">
                <div class="text-black font-weight-bold text-h6">
                  {{ comment.comment }}
                </div>
                <p class="text-grey">
                  {{ formatDateWithTime(comment.datetime) }}
                </p>
              </div>
              <v-divider></v-divider>
            </div>
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
  </div>
</template>
<script>
import axios from "axios";
import config from "../config.js";
const api = config.LOCAL_API_URL;

export default {
  data() {
    return {
      overlay: false,
      overlay2: false,
      itemPerPage: 4,
      showSeeMore: false,
      selectblog: "",
      comment: "",

      blogsDatabase: [],
      topBlogs: [],
      comments: [],
    };
  },
  mounted() {
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
        const blogsResponse = await axios.get(api + "/blogs", {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });
        this.blogsDatabase = blogsResponse.data.response;

        this.showSeeMore = true;
        if (this.itemPerPage >= this.blogsDatabase.length) {
          this.showSeeMore = false;
        }
      } catch (error) {
        console.error("Error fetching all blogs:", error);
        await this.retryAfterDelay(this.getAllBlogs);
      }
    },
    async getTopBlogs() {
      try {
        const topblogsResponse = await axios.get(api + "/blogs/top", {
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });
        this.topBlogs = topblogsResponse.data.response;
      } catch (error) {
        console.error("Error fetching all blogs:", error);
        await this.retryAfterDelay(this.getTopBlogs);
      }
    },

    //Will add one-time cache later
    async getComments(BlogID) {
      try {
        const commentsResponse = await axios.get(
          api + "/blogs/comments/" + BlogID,
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
            },
          }
        );
        this.comments = commentsResponse.data.response;
      } catch (error) {
        console.error("Error fetching all blogs:", error);
        await this.retryAfterDelay(this.getTopBlogs);
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
      const res = await axios.post(api + "/blogs/comment", newComment, {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      });
      console.log(res);
      if (res.status == 200) {
        this.comments.unshift({ comment: comment, datetime: timestamp });
        this.overlay2 = !this.overlay2;
        this.comment = "";
      }
    },
    seeMore(plusNum) {
      if (this.itemPerPage <= this.blogsDatabase.length - 1) {
        this.itemPerPage += plusNum;
        if (this.itemPerPage >= this.blogsDatabase.length - 1) {
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
      const now = new Date();

      let timestamp = now.toISOString();
      //post

      this.addComment(BlogID, comment, timestamp);
    },
    cancelComment() {
      this.overlay2 = !this.overlay2;
    },
    topBlogImage(buffer, url) {
      if (buffer == null) {
        return `${url}`;
      }
      if (url == null) {
        let imgurl = this.getImageUrl(buffer);
        return imgurl;
      }
    },
    showDetail(blog) {
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
  .card1 {
    height: 400px;
  }
  .card1 .blog-subtitle,
  .card2 .blog-subtitle,
  .card3 .blog-subtitle {
    margin-left: 8px;
    margin-right: 4px;
  }
  .cards-right {
    margin-left: 8px;
  }
  .card2 {
    height: 196px;
  }
  .card3 {
    margin-top: 8px;
    height: 196px;
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
  .card1 {
    height: 600px;
  }
  .card1 .blog-subtitle,
  .card2 .blog-subtitle,
  .card3 .blog-subtitle {
    margin-left: 20px;
    margin-right: 10px;
  }
  .cards-right {
    margin-left: 20px;
  }
  .card2 {
    height: 290px;
  }
  .card3 {
    height: 290px;
    margin-top: 20px;
  }
}
</style>
