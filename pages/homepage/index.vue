<template>
  <v-divider color="brown"> </v-divider>
  <v-card flat>
    <v-tabs v-model="tab" color="rgb(240, 200, 165)" align-tabs="center">
      <v-tab :value="1">Home</v-tab>
      <v-tab :value="2">Type coffee beans</v-tab>
      <v-tab :value="3">Blog</v-tab>
      <v-tab :value="4">News</v-tab>
      <v-tab :value="5">Contact</v-tab>
    </v-tabs>
  </v-card>
  <v-card flat>
    <v-window v-model="tab">
      <v-window-item :value="1"> <home /> </v-window-item>
      <v-window-item :value="2"><typepage />  </v-window-item>
      <v-window-item :value="3"> <blog/> </v-window-item>
      <v-window-item :value="4"> <news/> </v-window-item>
      
      <v-window-item
        :value="5"
        
      >
      <div class="d-flex justify-center align-center contact-window">
        <contact />
      </div>
        
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script>
import home from "../components/home.vue";
import typepage from "../components/typepage.vue";
import news from "../components/news.vue";
import blog from "../components/blog.vue";
import contact from "../components/contact.vue";
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
