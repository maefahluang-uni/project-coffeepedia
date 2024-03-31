<template>
  <v-divider color="brown"> </v-divider>
  <v-card flat>
    <v-tabs v-model="tab" color="rgb(240, 200, 165)" align-tabs="center">
      <v-tab :value="1" class="font-weight-bold" @click="closeExpand()"
        >Home</v-tab
      >
      <v-tab :value="2" class="font-weight-bold" @click="closeExpand()"
        >Type coffee beans</v-tab
      >

      <v-btn
        class="font-weight-bold tab-btn d-flex px-4"
        height="48"
        rounded="0"
        variant="text"
        @click="toggleIcon()"
        >Master Data
        <v-icon>{{
          isIconUp ? "mdi-chevron-up" : "mdi-chevron-down"
        }}</v-icon></v-btn
      >
      <v-tab :value="6" class="font-weight-bold" @click="closeExpand()"
        >Blog</v-tab
      >
      <v-tab :value="7" class="font-weight-bold" @click="closeExpand()"
        >News</v-tab
      >
      <v-tab :value="8" class="font-weight-bold" @click="closeExpand()"
        >Contact</v-tab
      >
    </v-tabs>
  </v-card>
  <v-expand-transition>
    <v-card flat v-show="isIconUp">
      <v-tabs v-model="expandTab" color="rgb(240, 200, 165)" align-tabs="center"
        ><v-tab :value="3" class="font-weight-bold" @click="openExpandTab()"
          >Process</v-tab
        >
        <v-tab :value="4" class="font-weight-bold" @click="openExpandTab()"
          >Roast</v-tab
        >
        <v-tab :value="5" class="font-weight-bold" @click="openExpandTab()"
          >Map</v-tab
        >
      </v-tabs>
    </v-card>
  </v-expand-transition>
  <v-expand-transition>
    <v-card flat>
      <v-window v-model="tab" v-show="showMainTab">
        <v-window-item :value="1"> <admin-home-page /> </v-window-item>
        <v-window-item :value="2" :key="'admin-coffeetypes-page-' + reloadKey"
          ><admin-coffeetypes-page />
        </v-window-item>

        <v-window-item :value="6"> <blog /> </v-window-item>
        <v-window-item :value="7"> <admin-news-page /> </v-window-item>
        <v-window-item :value="8">
          <div class="d-flex justify-center align-center contact-window">
            <contact />
          </div>
        </v-window-item>
      </v-window>
      <v-window v-model="expandTab" v-show="showExpandTab">
        <v-window-item :value="3"><admin-process-page /> </v-window-item>
        <v-window-item :value="4"><admin-roast-page /> </v-window-item>
        <v-window-item :value="5"><admin-map-page /> </v-window-item>
      </v-window> </v-card
  ></v-expand-transition>
</template>

<script>
export default {
  data: () => ({
    showMainTab: true,
    showExpandTab: false,
    tab: 1,
    expandTab: "",
    isIconUp: false,
    reloadKey: 0,
  }),
  methods: {
    toggleIcon() {
      this.isIconUp = !this.isIconUp;
    },
    closeExpand() {
      this.isIconUp = false;
      this.showMainTab = true;
      this.showExpandTab = false;
      this.expandTab = "";
    },
    openExpandTab() {
      this.showMainTab = false;
      this.showExpandTab = true;
      this.tab = "";
    },
    reloadComponent() {
      this.reloadKey += 1;
    },
  },
  watch: {
    // Watch for changes in tab value to trigger reload
    tab(newTab) {
      if (newTab === 2) {
        // Adjust condition based on your tab values
        this.reloadComponent();
      }
    },
  },
};
</script>
<style>
.contact-window {
  height: 80vh;
}
</style>
