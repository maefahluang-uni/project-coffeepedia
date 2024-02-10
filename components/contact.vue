<template>
  <v-card max-width="344" max-height="190" elevation="16">
    <div class="text-h5 text-brown mt-3 ml-4 mr-4 text-center">
      <h5>Integrated AgriTech Ecosystem Research(IATE)</h5>
    </div>
    <div class="text-brown">
      <v-card-text class="text-center">
        {{ address }}
        <br />
        Tel: {{ phone }} <br />
        E-mail: {{ email }}
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";
const api = "http://localhost:5000/api";

export default {
  data() {
    return {
      address: "",
      phone: "",
      email: "",
    };
  },
  async mounted() {
    try {
      const contactResponse = await axios.get(api + "/contact");
      this.address = contactResponse.data.response[0].Address;
      this.phone = contactResponse.data.response[0].Phone;
      this.email = contactResponse.data.response[0].Email;
    } catch (error) {
      console.error("Error fetching contact:", error);
    }
  },
};
</script>
