<template>
  <v-divider color="brown"> </v-divider>
  <v-card flat>
    <v-tabs v-model="tab" color="rgb(240, 200, 165)" align-tabs="center">
      <v-tab :value="1" class="font-weight-bold" @click="closeExpand()"
        >Dashboard</v-tab
      >
      <v-tab :value="2" class="font-weight-bold" @click="closeExpand()"
        >Type coffee bean</v-tab
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
      <v-divider color="brown"> </v-divider>
      <v-tabs v-model="expandTab" color="rgb(240, 200, 165)" align-tabs="center"
        ><v-tab :value="3" class="font-weight-bold" @click="openExpandTab()"
          >Process</v-tab
        >
        <v-tab :value="4" class="font-weight-bold" @click="openExpandTab()"
          >Roast</v-tab
        >
        <v-tab :value="5" class="font-weight-bold" @click="openExpandTab()"
          >Location</v-tab
        >
        <v-tab :value="9" class="font-weight-bold" @click="openExpandTab()"
          >Varieties</v-tab
        >
        <v-tab :value="6" class="font-weight-bold" @click="openExpandTab()"
          >Score categories</v-tab
        >
      </v-tabs>
    </v-card>
  </v-expand-transition>
  <v-expand-transition>
    <v-card flat>
      <v-window v-model="tab" v-show="showMainTab">
        <v-window-item disabled :value="1"> <admin-home-page /> </v-window-item>
        <v-window-item
          disabled
          :value="2"
          :key="'admin-coffeetypes-page-' + reloadKey"
          ><admin-coffeetypes-page />
        </v-window-item>

        <v-window-item disabled :value="6"> <admin-blog-page /> </v-window-item>
        <v-window-item disabled :value="7"> <admin-news-page /> </v-window-item>
        <v-window-item disabled :value="8">
          <div class="d-flex justify-center align-center contact-window">
            <admin-contact-page />
          </div>
        </v-window-item>
      </v-window>
      <v-window v-model="expandTab" v-show="showExpandTab">
        <v-window-item disabled :value="3"
          ><admin-process-page />
        </v-window-item>
        <v-window-item disabled :value="4"><admin-roast-page /> </v-window-item>
        <v-window-item disabled :value="5" :key="'admin-map-page-' + reloadKey"
          ><admin-map-page />
        </v-window-item>
        <v-window-item
          disabled
          :value="9"
          :key="'admin-varieties-page-' + reloadKey"
          ><admin-varieties-page />
        </v-window-item>
        <v-window-item disabled :value="6"
          ><admin-scores-page />
        </v-window-item>
      </v-window> </v-card
  ></v-expand-transition>
</template>

<script>
import { useCookies } from "vue3-cookies";
export default defineComponent({
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  data: () => ({
    showMainTab: true,
    showExpandTab: false,
    tab: 1,
    expandTab: "",
    isIconUp: false,
    reloadKey: 0,
  }),
  created() {
    // Check if user is admin before rendering admin dashboard
    try {
      if (
        !this.cookies.isKey("isAdmin") ||
        this.cookies.get("isAdmin") !== "true"
      ) {
        this.$router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  },
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
    expandTab(newTab) {
      if (newTab === 5) {
        // Adjust condition based on your tab values
        this.reloadComponent();
      }
      if (newTab === 9) {
        // Adjust condition based on your tab values
        this.reloadComponent();
      }
    },
    reloadKey(newKey) {
      if (newKey > 1) {
        this.reloadKey = 0;
      }
    },
  },
});
</script>
<style>
.contact-window {
  height: 80vh;
}
</style>
