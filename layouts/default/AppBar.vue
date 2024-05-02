<template>
  <v-app-bar elevation="0">
    <v-row justify="space-between">
      <div class="d-none d-md-flex">
        <v-col cols="3" class="ml-5">
          <div class="d-inline-flex" @click="toHome()">
            <v-img
              height="50"
              width="150"
              src="@/assets/blackloco1.png"
              class="ma-2"
            />

            <v-img
              height="30"
              width="150"
              src="@/assets/blackloco2.png"
              class="ma-2 mt-4"
            />
          </div>
        </v-col>
      </div>

      <div class="d-flex d-md-none" @click="toHome()">
        <div class="d-inline-flex">
          <v-img
            height="37"
            width="120"
            src="@/assets/blackloco1.png"
            class="mt-2 mb-2"
          />

          <v-img
            height="25"
            width="110"
            src="@/assets/blackloco2.png"
            class="mt-3 ml-1"
          />
        </div>
        <v-spacer />
      </div>

      <div class="d-none d-sm-flex">
        <v-col align="end" align-self="center" class="mr-10">
          <v-btn class="mr-5" icon="mdi-magnify" size="35" color="#39150E" />
          <v-btn
            class="mr-5"
            size="35"
            color="#39150E"
            rounded
            @click="changeLanguage()"
          >
            {{ language }}</v-btn
          >
          <v-btn
            @click="login()"
            class="mr-5"
            icon="mdi-account"
            size="35"
            color="#39150E"
          />
          <v-btn
            v-if="isAdmin"
            variant="outlined"
            class="rounded-xl"
            @click="logout()"
            text="Sign-out"
            color="error"
          />
          <v-btn
            v-else
            @click="login()"
            text="Sign-in"
            variant="outlined"
            class="rounded-xl"
            color="success"
          ></v-btn>
        </v-col>
      </div>

      <div class="d-flex d-sm-none">
        <v-col align="end" align-self="center">
          <v-btn
            class="mr-5"
            icon="mdi-menu"
            size="35"
            color="#39150E"
            @click="overlay = !overlay"
          />
        </v-col>
      </div>
    </v-row>
  </v-app-bar>
  <v-navigation-drawer v-model="overlay" location="right" temporary>
    <v-list>
      <v-list-item
        prepend-icon="mdi-magnify"
        title="Search"
        value="search"
      ></v-list-item>
      <v-list-item
        @click="login()"
        prepend-icon="mdi-account"
        title="Admin account"
        value="account"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-translate"
        :title="language"
        value="language"
        @click="changeLanguage()"
      ></v-list-item
      ><v-list-item v-if="isAdmin" class="d-flex justify-center"
        ><v-btn
          @click="logout()"
          text="Sign-out"
          color="error"
          variant="outlined"
          class="rounded-xl"
      /></v-list-item>
      <v-list-item v-else class="d-flex justify-center">
        <v-btn
          @click="login()"
          text="Sign-in"
          variant="outlined"
          class="rounded-xl"
          color="success"
        ></v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { useCookies } from "vue3-cookies";
import { watch } from "vue";
export default defineComponent({
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  data: () => ({
    overlay: false,
    language: "TH",
    isAdmin: false,
  }),
  mounted() {
    this.isAdmin = false;
    if (
      this.cookies.isKey("isAdmin") ||
      this.cookies.get("isAdmin") == "true"
    ) {
      this.isAdmin = true;
    }
  },
  methods: {
    changeLanguage() {
      this.language = this.language === "EN" ? "TH" : "EN";
    },
    toHome() {
      this.$router.push("/");
    },
    login() {
      if (this.isAdmin) {
        this.$router.push("/admin");
      }
      this.$router.push("/login");
    },
    logout() {
      if (this.cookies.isKey("isAdmin")) {
        this.isAdmin = false;
        this.cookies.remove("isAdmin");
        this.$router.push("/");
      }
    },
  },
  watch: {
    isAdmin(val) {
      this.isAdmin = val;
    },
  },
});
</script>
