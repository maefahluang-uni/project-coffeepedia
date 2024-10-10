<template>
  <v-snackbar v-model="showConsent" multi-line timeout="-1">
    <span
      >We use cookies to improve your experience on our site. Do you
      accept?</span
    >
    <template #actions>
      <v-btn
        color="success"
        variant="outlined"
        class="mr-3"
        @click="acceptCookies"
        >Accept</v-btn
      >
      <v-btn
        color="error"
        variant="outlined"
        class="mr-3"
        @click="declineCookies"
        >Decline</v-btn
      >
    </template>
  </v-snackbar>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import config from "../config.js";
const api = config.LOCAL_API_URL;
const apiKey = config.API_KEY;
const apiHaders = { "ngrok-skip-browser-warning": "true", "api-key": apiKey };

// Cookie management
const consentCookie = useCookie("cookieConsent", {
  expires: new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000), // 1 year expiration
});
const showConsent = ref(false); // Control the display of the consent banner

const acceptCookies = async () => {
  consentCookie.value = "accepted";
  showConsent.value = false;
  try {
    const response = await axios.get(api + "api/visithandler/handler", {
      headers: apiHaders,
    });
    if (response.data.response.success) {
      console.log("Visit count updated in database");
    } else {
      console.error("Error updating visit count in database");
    }
  } catch (error) {
    console.error("Failed to update visit count:", error);
  }
};

const declineCookies = () => {
  consentCookie.value = "declined";
  showConsent.value = false;
};

onMounted(() => {
  // Check if the user has already made a decision
  if (!consentCookie.value) {
    showConsent.value = true; // Show the consent banner if no cookie is set
  }
});
</script>

<style scoped>
v-snackbar {
  padding: 20px;
}
</style>
