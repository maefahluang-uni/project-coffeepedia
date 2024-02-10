<template>

<div><v-layout style="height: 56px;">
    <v-bottom-navigation

    v-model="value"
      active
      color="primary"

    >
      <v-btn 
      rounded="xl"
      color="rgb(184, 127, 89)"
        
                height="30"
                class="mt-6"
      >
        <h3>All</h3>
      </v-btn>
      <v-btn rounded="xl"
      color="rgb(140, 115, 70)"
         
                height="30"
                class="mt-6">
        <h3>Wet process</h3>
      </v-btn>
      <v-btn rounded="xl"
      color="rgb(140, 115, 70)"
           
                height="30"
                class="mt-6">
        <h3>Dry process</h3>
      </v-btn>
      <v-btn rounded="xl"
      color="rgb(140, 115, 70)"
      
                height="30"
                class="mt-6">
        <h3>Honey process</h3>
      </v-btn>
    </v-bottom-navigation>
</v-layout>
</div>

<h1 class="text-h5 font-weight-bold mt-16 text-center text-brown">Light Roasted</h1>
<h2 class="text-h6 font-weight-bold mt-9 text-center text-black">Wet Process</h2>
<v-row class="justify-center mt-16">
  <v-btn
        class="ma-10"
        icon="mdi-chevron-left"
        color="gray"
        flat
        size="x-large"
      ></v-btn>
<img  width="150" src="@/assets/WetLight.png" />
<img  width="150" src="@/assets/WetLightB.png" />
<v-btn
        class="ma-10"
        icon="mdi-chevron-right"
        color="gray"
        flat
        size="x-large"
      ></v-btn>

</v-row>

</template>

<script>
  export default {
    data: () => ({ value: 1 }),
  }
</script>
