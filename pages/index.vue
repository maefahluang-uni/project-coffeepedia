<template>
  <v-divider color="brown"> </v-divider>
  <v-card flat>
    <v-tabs v-model="tab" color="rgb(240, 200, 165)" align-tabs="center">
      <v-tab :value="1" class="font-weight-bold">Home</v-tab>
      <v-tab class="font-weight-bold" @click="this.$router.push('/map')"
        >Map</v-tab
      >
      <v-tab :value="2" class="font-weight-bold">Type coffee bean</v-tab>
      <v-tab :value="3" class="font-weight-bold">Blog</v-tab>
      <v-tab :value="4" class="font-weight-bold">News</v-tab>
      <v-tab :value="5" class="font-weight-bold">Contact</v-tab>
    </v-tabs>
  </v-card>
  <v-card flat>
    <v-window v-model="tab">
      <v-window-item disabled :value="1"> <home /> </v-window-item>
      <v-window-item disabled :value="2"><typepage /> </v-window-item>
      <v-window-item disabled :value="3"> <blog /> </v-window-item>
      <v-window-item disabled :value="4"> <news /> </v-window-item>

      <v-window-item disabled :value="5">
        <div class="d-flex justify-center align-center contact-window">
          <contact />
        </div>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    tab: 1,
  }),
  created() {},
};
</script>
<style>
.contact-window {
  height: 80vh;
}
</style>
