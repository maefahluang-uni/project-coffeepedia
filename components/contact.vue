<template>
  <v-card
    v-if="(address == '') & (phone == '') & (email == '')"
    width="344"
    elevation="16"
  >
    <v-skeleton-loader type="list-item-two-line"></v-skeleton-loader>
  </v-card>
  <div class="ma-2" v-else>
    <div class="cardbordertop ml-8"></div>

    <div class="d-inline-flex">
      <div class="cardborderleft mt-4"></div>

      <v-card class="text-center" rounded="0" elevation="4">
        <div class="d-flex d-sm-none text-h5 text-brown mt-3 ml-4 mr-4">
          <h5>Integrated AgriTech Ecosystem Research(IATE)</h5>
        </div>
        <div class="d-none d-sm-flex text-h4 text-brown mt-3 ml-4 mr-4">
          <h5>Integrated AgriTech Ecosystem Research(IATE)</h5>
        </div>

        <div class="text-brown d-flex d-sm-none justify-center">
          <div class="ma-2">
            {{ address }}
            <br />
            <div class="d-inline-flex">
              <div class="font-weight-bold">Tel:&nbsp;</div>
              <div>
                {{ phone }}
              </div>
            </div>
            <br />
            <div class="d-inline-flex">
              <div class="font-weight-bold">Email:&nbsp;</div>
              <div>
                {{ email }}
              </div>
            </div>
          </div>
        </div>

        <div class="text-brown d-none d-sm-flex justify-center">
          <div class="ma-2 text-h6">
            {{ address }}
            <br />
            <div class="d-inline-flex">
              <div class="font-weight-bold">Tel:&nbsp;</div>
              <div>
                {{ phone }}
              </div>
            </div>
            <br />
            <div class="d-inline-flex">
              <div class="font-weight-bold">Email:&nbsp;</div>
              <div>
                {{ email }}
              </div>
            </div>
          </div>
        </div>
      </v-card>
      <!--d-none d-sm-flex d-md-flex-->

      <div class="cardborderright mb-4"></div>
    </div>

    <div class="cardborderbottom mt-n2 mr-8"></div>
  </div>
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
      address: "",
      phone: "",
      email: "",
    };
  },
  created() {
    this.getContact();
  },
  methods: {
    async getContact() {
      try {
        const contactResponse = await axios.get(api + "api/contact", {
          headers: apiHaders,
        });
        this.address = contactResponse.data.response[0].Address;
        this.phone = contactResponse.data.response[0].Phone;
        this.email = contactResponse.data.response[0].Email;
      } catch (error) {
        console.error("Error fetching contact:", error);
        await this.retryAfterDelay(this.getContact);
      }
    },
    async retryAfterDelay(apiCall) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await apiCall();
    },
  },
  watch: {
    address(val) {
      this.address = val;
    },
    phone(val) {
      this.phone = val;
    },
    email(val) {
      this.email = val;
    },
  },
};
</script>
<style>
.cardborderleft {
  display: flex;
  width: 15px;
  background: rgb(190, 155, 121);
}
.cardbordertop {
  /* margin-right: calc(25px - var(--card-width));*/
  display: flex;
  height: 15px;
  background: rgb(161, 121, 83);
}
.cardborderright {
  display: flex;
  width: 15px;
  background: rgb(161, 121, 83);
}
.cardborderbottom {
  display: flex;
  height: 15px;
  background: rgb(190, 155, 121);
}
</style>
