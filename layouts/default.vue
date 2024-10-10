<template>
  <v-app>
    <DefaultBar />
    <CookieConsent />
    <DefaultView />
  </v-app>
</template>

<script setup>
import DefaultBar from "./default/AppBar.vue";
import DefaultView from "./default/View.vue";
import CookieConsent from "./default/CookieConsent.vue";
import { onMounted } from "vue";
import axios from "axios";
import config from "../config.js";
const api = config.LOCAL_API_URL;
const apiKey = config.API_KEY;
const apiHaders = { "ngrok-skip-browser-warning": "true", "api-key": apiKey };
const visitedTodayCookie = useCookie("visitedToday");
const consentCookie = useCookie("cookieConsent");

const updateVisitCount = async () => {
  if (consentCookie.value === "accepted") {
    // Check if the user has visited today using a cookie
    const userVisitedToday = visitedTodayCookie.value;

    if (!userVisitedToday) {
      // Set a cookie to remember the user for the day
      const midnight = new Date();
      midnight.setHours(23, 59, 59, 999);
      visitedTodayCookie.value = true;
      visitedTodayCookie.options = { expires: midnight };

      // Call the backend API to update the visit count in the MySQL database
      try {
        const response = await axios.get(api + "api/visithandler/handler", {
          headers: apiHaders,
        });
        if (response.success) {
          console.log("Visit count updated in database");
        } else {
          console.error("Error updating visit count in database");
        }
      } catch (error) {
        console.error("Failed to update visit count:", error);
      }
    }
  }
};

onMounted(() => {
  updateVisitCount();
});
</script>
