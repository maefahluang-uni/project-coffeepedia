<template>
  <v-container class="pa-4">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="Email"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Password"
        type="password"
        required
      ></v-text-field>

      <v-btn @click="submit" :disabled="!valid" color="primary">Submit</v-btn>
      <v-btn @click="reset">Reset</v-btn>
    </v-form>

    <div v-if="submitted">
      <h3>Form Submitted Successfully!</h3>
      <p><strong>Name:</strong> {{ name }}</p>
      <p><strong>Email:</strong> {{ email }}</p>
    </div>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const form = ref(null);
const valid = ref(false);
const submitted = ref(false);

// Form Fields
const name = ref('');
const email = ref('');
const password = ref('');

// Validation Rules
const nameRules = [
  (v) => !!v || 'Name is required',
  (v) => (v && v.length >= 3) || 'Name must be at least 3 characters',
];

const emailRules = [
  (v) => !!v || 'Email is required',
  (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
];

const passwordRules = [
  (v) => !!v || 'Password is required',
  (v) => (v && v.length >= 6) || 'Password must be at least 6 characters',
];

// Submit form
const submit = () => {
  if (form.value.validate()) {
    submitted.value = true;
  }
};

// Reset form
const reset = () => {
  form.value.reset();
  submitted.value = false;
};
</script>

<style scoped>
h3 {
  margin-top: 20px;
}
</style>
