<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
        <h1>Guest Visit Count Today: {{ visitCount }}</h1>
        <!--<v-btn color="primary" @click="resetVisitCount">Reset Counter</v-btn>-->
        <v-btn color="error" @click="resetConsent">Reset Cookie Consent</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import config from "../config.js";
const api = config.LOCAL_API_URL;
const apiKey = config.API_KEY;
const apiHaders = { "ngrok-skip-browser-warning": "true", "api-key": apiKey };
const showConsent = ref(false);
const visitCount = ref(0);
const visitedTodayCookie = useCookie("visitedToday");
const consentCookie = useCookie("cookieConsent"); // Check for user consent

// Get today's date in YYYY-MM-DD format
const getTodayDateKey = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

// Function to update the visit count in both the frontend and backend
const updateVisitCount = async () => {
  if (consentCookie.value === "accepted") {
    const todayKey = getTodayDateKey();

    // Check if the user has visited today using a cookie
    const userVisitedToday = visitedTodayCookie.value;
    console.log(userVisitedToday);
    try {
      const response = await axios.get(api + "api/visithandler/visit_count", {
        headers: apiHaders,
      });
      if (response.status == 200) {
      }
    } catch (err) {}
    if (!userVisitedToday) {
      const storedData = JSON.parse(
        localStorage.getItem("guestVisitData") || "{}"
      );

      // Get the current count from LocalStorage or initialize it
      if (storedData[todayKey]) {
        visitCount.value = storedData[todayKey];
      } else {
        visitCount.value = 0;
      }

      // Increment the visit count for today
      visitCount.value += 1;
      storedData[todayKey] = visitCount.value;

      // Update LocalStorage
      localStorage.setItem("guestVisitData", JSON.stringify(storedData));

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
    } else {
      // If the user already visited today, retrieve the current count
      const storedData = JSON.parse(
        localStorage.getItem("guestVisitData") || "{}"
      );
      visitCount.value = storedData[todayKey] || 0;
    }
  }
};

const resetConsent = () => {
  consentCookie.value = null; // Clear the cookie
  showConsent.value = true; // Show the consent banner again
};
// Function to reset the visit count (local only)
const resetVisitCount = () => {
  const todayKey = getTodayDateKey();
  const storedData = JSON.parse(localStorage.getItem("guestVisitData") || "{}");
  storedData[todayKey] = 0;
  localStorage.setItem("guestVisitData", JSON.stringify(storedData));
  visitCount.value = 0;

  // Remove the cookie
  visitedTodayCookie.value = null;
};

onMounted(() => {
  updateVisitCount();
});
</script>

<style scoped>
h1 {
  margin: 20px 0;
}
</style>
