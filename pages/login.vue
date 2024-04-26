<template>
  <v-container class="d-flex justify-center mt-15">
    <v-card class="card-table elevation-5" height="500">
      <v-form ref="form">
        <div class="ma-15">
          <div class="font-weight-bold text-h4 text-center mb-5 mt-15">
            Sign-in
          </div>
          <v-text-field
            density="compact"
            variant="outlined"
            v-model="username"
            :rules="rules.requireInput('Username')"
            label="Username"
          ></v-text-field>
          <v-text-field
            density="compact"
            variant="outlined"
            v-model="password"
            :rules="rules.requireInput('Password')"
            label="Password"
            :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append-inner="showPassword = !showPassword"
          ></v-text-field>
          <div class="d-flex justify-center align-center">
            <v-btn
              v-if="!loggingin"
              @click="login()"
              class="rounded-xl"
              variant="outlined"
              >Login</v-btn
            >
            <v-progress-circular
              v-else
              size="small"
              :width="3"
              indeterminate
            ></v-progress-circular>
          </div>
          <div v-if="showWhyNotLoggin" class="text-center text-error my-5">
            Invalid username or password
          </div>
        </div>
      </v-form>
    </v-card>
  </v-container>
</template>
<script>
import axios from "axios";
import { useCookies } from "vue3-cookies";
import config from "../config.js";
const api = config.LOCAL_API_URL;
const apiKey = config.API_KEY;
const apiHaders = { "ngrok-skip-browser-warning": "true", "api-key": apiKey };
export default defineComponent({
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  data: () => ({
    username: "",
    password: "",
    showPassword: false,
    loggingin: false,
    showWhyNotLoggin: false,
    rules: {
      requireInput: (fieldName) => [
        (value) => {
          if (value) return true;
          return `${
            fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
          } is required`;
        },
      ],
    },
  }),
  mounted() {
    if (
      this.cookies.isKey("isAdmin") ||
      this.cookies.get("isAdmin") == "true"
    ) {
      this.$router.push("/admin");
    }
  },
  methods: {
    async login() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        try {
          this.loggingin = true;
          const sentItem = { username: this.username, password: this.password };
          const response = await axios.post(api + "/login", sentItem, {
            headers: apiHaders,
          });
          console.log(response);

          if (response.data.response.length != 0) {
            this.loggingin = false;
            this.cookies.set("isAdmin", "true");
            this.$router.push("/admin");
          }
          await new Promise((resolve) => setTimeout(resolve, 2000));
          this.loggingin = false;
          this.showWhyNotLoggin = true;
        } catch (error) {
          console.error("Login error:", error);
          throw error;
        }
      }
    },
  },
});
</script>
<style scoped>
.card-table {
  width: 500px;
}
@media (max-width: 600px) {
  .card-table {
    width: 90vw;
  }
}
</style>
