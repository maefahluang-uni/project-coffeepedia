<template>
  <v-card class="card-table pa-10 elevation-10">
    <v-form ref="contact">
      <div class="d-flex mb-4 align-center justify-space-between">
        <v-card-title> Contact information </v-card-title>
        <v-icon size="small" @click="toggleEditing()"> mdi-pencil </v-icon>
      </div>
      <v-text-field
        :readonly="!isEditing"
        class="mb-2"
        v-model="address"
        label="Address*"
        :rules="rules.requireInput('Address')"
      ></v-text-field>
      <v-text-field
        :readonly="!isEditing"
        class="mb-2"
        v-model="phone"
        label="Phone number*"
        :rules="rules.requireInput('Phone number')"
      ></v-text-field>
      <v-text-field
        :readonly="!isEditing"
        class="mb-2"
        v-model="email"
        label="Email*"
        :rules="rules.requireInput('Email')"
      ></v-text-field>
    </v-form>
    <div v-if="isEditing" class="d-flex justify-end">
      <v-btn color="error" variant="text" @click="cancel()" class="mr-2">
        <div class="font-weight-bold text-error">Cancel</div>
      </v-btn>
      <v-btn color="#6AC479" variant="elevated" @click="save()">
        <div class="font-weight-bold text-white">Save</div>
      </v-btn>
    </div>
  </v-card>
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
      isEditing: false,
      ID: "",
      address: "",
      phone: "",
      email: "",
      t_address: "",
      t_phone: "",
      t_email: "",

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
        this.ID = contactResponse.data.response[0].ID;
        this.address = contactResponse.data.response[0].Address;
        this.phone = contactResponse.data.response[0].Phone;
        this.email = contactResponse.data.response[0].Email;

        this.t_address = this.address;
        this.t_email = this.email;
        this.t_phone = this.phone;
      } catch (error) {
        console.error("Error fetching contact:", error);
        await this.retryAfterDelay(this.getContact);
      }
    },
    async retryAfterDelay(apiCall) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await apiCall();
    },
    toggleEditing() {
      this.isEditing = !this.isEditing;
    },
    cancel() {
      this.isEditing = false;
      this.address = this.t_address;
      this.email = this.t_email;
      this.phone = this.t_phone;
    },
    async save() {
      const { valid } = await this.$refs.contact.validate();
      if (!valid) {
        return;
      }
      if (this.isEditing) {
        this.t_address = this.address;
        this.t_email = this.email;
        this.t_phone = this.phone;
        const sentItem = {
          ID: this.ID,
          address: this.address,
          phone: this.phone,
          email: this.email,
        };
        const contactResponse = await axios.post(
          api + "api/contact",
          sentItem,
          {
            headers: apiHaders,
          }
        );
        if (contactResponse.data.status == 200) {
          this.t_address = this.address;
          this.t_email = this.email;
          this.t_phone = this.phone;
          this.isEditing = false;
        }
      }
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
    isEditing(val) {
      this.isEditing = val;
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
