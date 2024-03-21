<template>
  <v-divider color="brown"> </v-divider>
  <v-card flat>
    <v-tabs v-model="tab" color="rgb(240, 200, 165)" align-tabs="center">
      <v-tab :value="1" class="font-weight-bold">Home</v-tab>
      <v-tab :value="2" class="font-weight-bold">Type coffee beans</v-tab>
      <v-tab :value="3" class="font-weight-bold"
        >Roast & Process management</v-tab
      >
      <v-tab :value="4" class="font-weight-bold">Blog</v-tab>
      <v-tab :value="5" class="font-weight-bold">News</v-tab>
      <v-tab :value="6" class="font-weight-bold">Contact</v-tab>
    </v-tabs>
  </v-card>
  <v-card flat>
    <v-window v-model="tab">
      <v-window-item :value="1"> <admin-home-page /> </v-window-item>
      <v-window-item :value="2"><admin-coffeetypes-page /> </v-window-item>
      <v-window-item :value="3"><admin-roast-process-page /> </v-window-item>
      <v-window-item :value="4"> <blog /> </v-window-item>
      <v-window-item :value="5"> <admin-news-page /> </v-window-item>
      <v-window-item :value="6">
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
};
</script>
<style>
.contact-window {
  height: 80vh;
}
</style>
